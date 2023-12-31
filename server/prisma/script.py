from bs4 import BeautifulSoup
import requests
import re
import json
from tqdm import tqdm

from prisma import Prisma
import asyncio

# ********************************************************************************** #

async def main(book_data):
    prisma = Prisma()
    await prisma.connect()

    user = await prisma.book.create(
        data={
            "title": book_data['title'],
            "author": book_data['author'],
            "price": book_data['price'],
            "dimensions": book_data['dimensions'],
            "pages": book_data['pages'],
            "materials": book_data['materials'],
            "publisher": book_data['publisher'],
            "description": book_data['description'],
            "reference": book_data['reference'],
            "inner_page_photo": book_data['images'],
        }
    )

    await prisma.disconnect()

# *********************************************************************************** #


def extract_text(tag):
    return tag.text.strip() if tag else None

def clean_cost(cost):
    return cost.replace("$", "").replace("\n", "")

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


def get_post_data(url):
    book_data = {}
    res = requests.get(url)

    if res.status_code == 200:
        soup = BeautifulSoup(res.text, "html.parser")

        book_data["title"] = extract_text(soup.find("h1", {"class": "hero-title"}))
        book_data["author"] = extract_text(soup.find("h2", {"class": "hero-subtitle"}).find("a") if soup.find("h2", {"class": "hero-subtitle"}) else None)
        book_data["price"] = clean_cost(extract_text(soup.find("div", {"class": "row"}).find("h3")))

        features = soup.find("div", {"class": "book-meta"})

        get_features = features.find_all("p")
        for feature in get_features:
            match = re.match(r'([^:]+): (.+)', feature.text)  # Notice the space after the colon
            if match:
                key = match.group(1).strip()
                value = match.group(2).strip()
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
    tasks = []

    for post in tqdm(ALL_POSTS):
        post_url = post['permalink']
        book_data = get_post_data(post_url)

        task = main(book_data)
        tasks.append(task)

        all_post_data.append(book_data)
        num_books += 1

        break

    asyncio.run(asyncio.gather(*tasks))

    with open("./outputs/cfba.json", "w", encoding="utf-8") as json_file:
        json.dump(all_post_data, json_file, ensure_ascii=False, indent=4)

    print(f"\n{num_books} BOOKS SCRAPED\n")

init_scrape()