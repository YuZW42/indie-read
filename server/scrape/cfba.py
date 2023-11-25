from bs4 import BeautifulSoup
import requests
import re
import json
from tqdm import tqdm

def extract_text(tag):
    return tag.text.strip() if tag else None

def clean_cost(cost):
    try:
        return float(cost.replace("$", "").replace("\n", "").replace(",", ""))
    except:
        return

def extract_materials(features):
    materials = features.find("ul", class_="list")
    return [m.text.replace("\n", "") for m in materials.find_all("li")] if materials else None


def extract_img(img):
    img_list = []
    img = img.find_all("div", class_="swiper-slide")
    
    if img:
        for i in img:
            if i.find("img")["src"]:
                img_list.append(i.find("img")["src"])
    
    return img_list if img_list else None

def get_description(article):
    cols_divs = article.find_all("div", class_="cols")
    second_cols_div = cols_divs[1]
    first_col_div = second_cols_div.find("div", class_="col")
    children = first_col_div.find_all()

    pattern = re.compile(r'^.+?:')

    desc = []

    for child in children:
        child_text = child.get_text().strip()

        if not pattern.match(child_text) and child_text and child.name not in ["ul", "li"]:            
            desc.append(child.text)

    return " ".join(desc)


def get_post_data(url, id):
    book_data = {}
    res = requests.get(url)

    if res.status_code == 200:
        soup = BeautifulSoup(res.text, "html.parser")


        # set id
        book_data["id"] = id
        book_data["url"] = url
        book_data["pages"] = None
        book_data["year"] = None


        book_data["title"] = extract_text(soup.find("h1", {"class": "hero-title"}))
        book_data["author"] = extract_text(soup.find("h2", {"class": "hero-subtitle"}).find("a") if soup.find("h2", {"class": "hero-subtitle"}) else None)
        book_data["price"] = clean_cost(extract_text(soup.find("div", {"class": "row"}).find("h3")))

        features = soup.find("div", {"class": "book-meta"})

        get_features = features.find_all("p")
        for feature in get_features:
            match = re.match(r'([^:]+): (.+)', feature.text)
            if match:
                key = match.group(1).strip()
                value = match.group(2).strip()

            # check for valid pages
                if key == "Pages":
                    try:
                        value = int(value)
                        book_data["pages"] = value
                        continue
                    except:
                        if value == "One-sheet":
                            value = 1
                            book_data["pages"] = value
                            continue
                        else:
                            value = None
                            book_data["pages"] = value
                            continue

            # check for valid year
                if key == "Year":
                    try:
                        value = int(value)
                        book_data["year"] = value
                        continue
                    except:
                        value = None
                        book_data["year"] = value
                        continue            

                book_data[key.lower()] = value
        try:
            book_data["materials"] = extract_materials(features)
        except Exception as e:
            print(f"MATERIALS NOT FOUND  -->  {book_data['title']}")
            print(e)
        
        article_div = soup.find("article", id="article")
        try:
            book_data["description"] = get_description(article_div).replace("\n", " ")
        except Exception as error:
            book_data["description"] = ""
            print(f"\nDESCRIPTION NOT FOUND  -->  {book_data['title']}")
            print(error)

        book_data["reference"] = None

        try:
            image = soup.find("div", class_="swiper-wrapper")
            book_data["images"] = extract_img(image)
        except:
            book_data["images"] = None
            print(f"\nIMAGE NOT FOUND  -->  {book_data['title']}")

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

    num_books = 0

    for i, post in enumerate(tqdm(ALL_POSTS)):
        if i == 50:
            break
        post_url = post['permalink']
        book_data = get_post_data(post_url, num_books)

        all_post_data.append(book_data)

        num_books += 1

    with open("./outputs/cfba.json", "w", encoding="utf-8") as json_file:
        json.dump(all_post_data, json_file, ensure_ascii=False, indent=4)

    print(f"\n{num_books} BOOKS SCRAPED\n")

init_scrape()


'''
    https://centerforbookarts.org/book-shop?cat=artists-books

    how does this all work?
        - the data is NOT being injected onto the site via the HTML tag
            - instead it is through a SCRIPT tag that has all the data in JSON
        - I specifically grab the URL to each ARTBOOK so that I can scrape that site instead
            - the artbook pages don't use a script tag so I use normal scraping methods

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