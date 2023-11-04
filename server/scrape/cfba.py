from bs4 import BeautifulSoup
import requests
import re
import json
from tqdm import tqdm
from pprint import pprint

def get_post_data(url):
    book_data = {}
    res = requests.get(url)

    if res.status_code == 200:
        soup = BeautifulSoup(res.text, "html.parser")

        title = soup.find("h1", {"class" : "hero-title"}).text
        author = soup.find("h2", {"class" : "hero-subtitle"}).find("a").text
        cost = soup.find("div", {"class" : "row"}).find("h3").text

        features = soup.find("div", {"class" : "book-meta"}).text

        keys_to_extract = ["Edition", "Year", "Binding", "Dimensions", "Pages"]
        pattern = r'(' + '|'.join(keys_to_extract) + r')\s*:\s*(.*?)(?=(?:' + '|'.join(keys_to_extract) + r')|$)' 
        matches = re.findall(pattern, features)
        result = {key: value.strip() for key, value in matches}

        book_data["title"] = title
        book_data["author"] = author
        book_data["cost"] = cost

        for key in keys_to_extract:
            if key in result:
                book_data[key.lower()] = result[key]

        desc = soup.find("div", {"class" : "col"})
        concatenate_desc = ""
        child_divs = desc.find_all("div", class_=lambda x: x != "book-meta")

        for child_div in child_divs:
            concatenate_desc += child_div.get_text().strip() + " "
        
        concatenate_desc = concatenate_desc.strip()

        book_data["desciption"] = concatenate_desc
        book_data["reference"] = None


        img = soup.find("div", {"class" : "swiper-wrapper"}).find_all("img").text
        book_data["img"] = img

        return book_data
    '''
    [] description now found
    [] img not found
    '''


def init_scrape():
    with open("./outputs/posts.txt", "w") as file:
        pass

    all_post_data = []

    url = "https://centerforbookarts.org/book-shop"

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    script = str(soup.find('script', string=re.compile('.*posts.*')))

    ALL_POSTS = json.loads(re.findall('(\[.*\]);', script)[0])

    for post in tqdm(ALL_POSTS):
        post_url = post['permalink']
        book_data = get_post_data(post_url)
        
        all_post_data.append(book_data)
        break
    
    # Save the product data to a JSON file
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