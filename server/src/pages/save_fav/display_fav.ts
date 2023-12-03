import prisma from '../shared/prismaclient';
async function display_fav(preference: any) {
  try {
    const uniqueBookIds = new Set<number>();

    if (preference && preference.list) {
      const bookIds = preference.list.split(',').map((id: string) => parseInt(id, 10));
      bookIds.forEach((id) => uniqueBookIds.add(id));
    }

    const uniqueBookIdsArray = Array.from(uniqueBookIds);

    console.log("array",preference)
    const books = await prisma.book.findMany({
      where: {
        temp_id: {
          in: uniqueBookIdsArray,
        },
      },
    });
    const booksW = books.map(book => ({
      ...book,
      temp_id: String(book.temp_id)
  
    }));
    
    return booksW  ;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    throw new Error('Failed to fetch books');
  }
}

export default display_fav;