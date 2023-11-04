import requests
from bs4 import BeautifulSoup

url = 'https://centerforbookarts.org/book-shop/artists-books/zines/can-you-see-what-i-see'
res = requests.get(url)

if res.status_code == 200:
    soup = BeautifulSoup(res.text, 'html.parser')
    title = soup.find("h1", {"class" : "hero-title"})

    print(title)