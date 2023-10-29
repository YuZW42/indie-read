import requests
from bs4 import BeautifulSoup

def get_product_description(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        description = soup.find(class_="description")
        description = description.find_all("p")

        description_text = '\n'.join([p.get_text(strip=True) for p in description])
        return description_text

    return "No Description"

def init_scrape(url):
    response = requests.get(url)
    while True:
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            product_list = soup.find(class_="product-list")
            product_blocks = product_list.find_all(class_="product-block")
        
            for product in product_blocks:
                ART_TITLE = product.find("div", class_="block-inner").find("div", class_="inner").find("div", class_="innerer").find("div", class_="title")
                ART_COST = product.find("div", class_="block-inner").find("div", class_="inner").find("div", class_="innerer").find("span", class_="price")
                ART_IMAGE = product.find("div", class_="block-inner").find("div", class_="image-label-wrap").find("img")
                ART_LINK = product.find("div", class_="block-inner").find("a", class_="product-link")

                title = ART_TITLE.text.strip()
                cost = ART_COST.text.strip()
                image_url = "https:" + ART_IMAGE["src"] if ART_IMAGE else "Image not found"
                image_url = image_url.replace('480', '180') # resize image just to fit MD file
                link = 'https://draw-down.com' + ART_LINK['href']

                desc = get_product_description(link)

                with open("output.md", "a", encoding="utf-8") as file:
                    file.write(f'# {title} - {cost}\n\n')
                    file.write(f'![Image]({image_url})\n\n')
                    file.write(f'{desc}\n\n')
                    file.write(f'{link}\n\n')
                    file.write('---\n\n')

                print("successfully retrieved art data")

            print()
            print("all art has been retrieved for this page, i think")
            print()

            next_button = soup.find('div', class_="pagination").find('a', class_="next")
            if next_button:
                url = "https://draw-down.com" + next_button['href'] 
            else:
                break

            response = requests.get(url)  
        else:
            print("failed :(", response.status_code)
            break

if __name__ == '__main__':
    url = "https://draw-down.com/collections/zines"
    with open("output.md", "w", encoding="utf-8") as file:  
        pass  
    init_scrape(url)