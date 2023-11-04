from bs4 import BeautifulSoup
import requests
import re
import json
from tqdm import tqdm

def extract_text(tag):
    return tag.text.strip() if tag else None

def clean_cost(cost):
    return cost.replace("$", "").replace("\n", "")

def extract_materials(features):
    materials = features.find("ul", class_="list")
    return [m.text for m in materials.find_all("li")] if materials else None

def extract_img(img):
    img_list = []
    img = img.find_all("div", class_="swiper-slide")
    
    if img:
        for i in img:
            if i.find("img")["src"]:
                img_list.append(i.find("img")["src"])
    
    return img_list if img_list else None


def get_post_data(url):
    book_data = {}
    res = requests.get(url)

    if res.status_code == 200:
        soup = BeautifulSoup(res.text, "html.parser")

        book_data["title"] = extract_text(soup.find("h1", {"class": "hero-title"}))
        book_data["author"] = extract_text(soup.find("h2", {"class": "hero-subtitle"}).find("a") if soup.find("h2", {"class": "hero-subtitle"}) else None)
        book_data["price"] = clean_cost(extract_text(soup.find("div", {"class": "row"}).find("h3")))

        features = soup.find("div", {"class": "book-meta"})

        keys_to_extract = ["Edition", "Year", "Binding", "Dimensions", "Pages", "ISBN"]
        pattern = r'(' + '|'.join(keys_to_extract) + r')\s*:\s*(.*?)(?=(?:' + '|'.join(keys_to_extract) + r')|$)'
        matches = re.findall(pattern, features.text)
        result = {key: value.strip() for key, value in matches}

        for key in keys_to_extract:
            book_data[key.lower()] = result.get(key, None)

        try:
            book_data["materials"] = extract_materials(features)
        except Exception as e:
            print(f"Failed to retrieve MATERIALS at Artist Book {book_data['title']}")
            print(e)
            
        book_data["description"] = "No Description"
        book_data["reference"] = None

        try:
            image = soup.find("div", class_="swiper-wrapper")
            book_data["images"] = extract_img(image)
        except:
            book_data["images"] = None
            print(f"\nNo images found for Artist's : Book {book_data['title']}")

        return book_data
    else:
        print("Status Code 200 Failed")
        return

def init_scrape():
    all_post_data = []

    url = "https://centerforbookarts.org/book-shop"

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    script = str(soup.find('script', string=re.compile('.*posts.*')))

    ALL_POSTS = json.loads(re.findall('(\[.*\]);', script)[0])

    num_books = 1

    for post in tqdm(ALL_POSTS):
        post_url = post['permalink']
        book_data = get_post_data(post_url)

        all_post_data.append(book_data)

        num_books += 1

    with open("./outputs/cfba.json", "w", encoding="utf-8") as json_file:
        json.dump(all_post_data, json_file, ensure_ascii=False, indent=4)

init_scrape()


'''
https://centerforbookarts.org/book-shop?cat=artists-books

how does this all work?
    - the data is NOT being injected onto the site via the HTML tag
        - instead it is through a SCRIPT tag that has all the data in JSON
    - I specifically grab the LINK to each ARTBOOK so that I can scrape that site instead
        - that page doesn't use a script tag so I can use normal scraping methods

how did the guy know that this was the reason?
    - looked up a specific title and found that it was found in the script tag
    - realized that if the HTML tag was empty BUT the page was populated then:
        - this must mean that the data must be coming from another place thats not HTML

whats all the regex mean?
    - the script tag that has the JSON has no ID or CLASS
    - used regex to find all the script tags:
        - with the word "post" inside

why does it have [0]?
    - the data coming back was in the form of a LIST holding another LIST holding a DICTIONARY (JSON)
'''