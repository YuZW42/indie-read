import prisma from '../shared/prismaclient'

async function read (keyword:string) {
  //const keyword = "activist"
  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { author: { contains: keyword } },
        {author: {contains: keyword.charAt(0).toUpperCase()+ keyword.slice(1)}},
        { description: { contains: keyword } },
        {publisher:{contains:keyword} }
      ],
    },
  });

  const booksW = books.map(book => ({
    ...book,
    temp_id: String(book.temp_id)

  }));

  return booksW;
  
}

export default read