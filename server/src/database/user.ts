import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//{log:["query"]}

export async function get_user () {
  //await prisma.user.deleteMany()
  const user = await prisma.book.create({
  data:{"title":"gt",
  "author":"jm",
  "price":4,
  "dimensions":["1","2"],
  "materials":"1",
  "description":"2",
  


}
  },)
  console.log(user)
  return user;
  
}




export default get_user 