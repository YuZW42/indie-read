import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//{log:["query"]}

async function main () {
  //await prisma.user.deleteMany()
  const user = await prisma.user.findMany({
    where:{
      name:{not:"Kyle"},
      },
  })
  console.log(user.length)

  
}
/*
async function create (){
  const book = await prisma.book.create({
    data:{
      title       
      author           
      price            Decimal
      dimensions       String[]
      Pages            Int?
      materials        String?
      publisher        String?
      description      String
      reference        String?
      inner_page_photo String?
    }
  })
}
*/
main()
.catch(e=>{
  console.error(e.message)

})
.finally(async()=>{
  await prisma.$disconnect()
})