## How to start our project:

install all the packages needs
```console
$ npm install 
```

start the project
```console
$ npm run dev 
```

## Build with:
* **Node:** Built for high-performance applications.
* **Express:** Lightweight and efficient framework.
* **Typescript:**   Enforces strict typing for better code quality.

## Database:
* **Prisma:** Simplifies database operations.
* **Supabase:**   Secure user login and management, client interface.
* **PostgreSQL:** ️  Free and widely used database solution that is the base to store our user and book information.

## Web Scraping Code:
**Python:**  Using BeautifulSoup, Re, and Requests modules


### URL that was scraped: https://centerforbookarts.org/book-shop
1. Going through each art book and scraping the following components:
    - Title
    - Cost
    - Description
    - Author
    - ISBN
    - Dimensions
    - Materials
    - Publisher
    - Reference
    - Images
    - Edition
    - Binding
    - Year
    - Original URL

2. Convert the scraped data into JSON format to be parsed through later
3. Convert the scraped data into CSV for an addtional format of the data

### URL that was scraped: https://draw-down.com/
1. Going through each art book and scraping the following components:
    - Title
    - Cost
    - Image
    - Original URL
    - Description
2. Ended up using Center For Book Arts as our main scraped data