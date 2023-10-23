import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//{log:["query"]}

export async function get_user () {
  //await prisma.user.deleteMany()
  const user = await prisma.user.findFirst({
  where:{name:'Kyle'}
  },)
  console.log(user)
  return user;
  
}




export default get_user 