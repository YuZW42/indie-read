import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import get_user from "../src/database/user"

// CFBA JSON FILE
//{log:["query"]}

async function donothing(){}

async function main () {
  await prisma.user.deleteMany()
  const user = await prisma.book.create({
    // for - loop --> goes through each book
   data:{
    title:"Kick Activist44",
    author:"Laura Nova",
    price:"200",
    dimensions:["5 × 7 in , 12.7 × 17.8 cm"],
    pages: 0,
    materials:"Digital Printing, Offset, Giant size card deck with custom tuck case",
    publisher:"Laura Nova",
    description:"Kung Fu Master Poa Shen Wong, a nonagenarian immigrant from Hong Kong teaches her martial arts at the Little Flower Park Basketball Court in our Lower East Side neighborhood. In the documentary video, Poa describes how a meditation group attempted to take over her exercise turf, but Poa fights back and reclaims her territory in the public park, while also offering us her exercise sequence. To encourage both activist and active audience participation, Poa offers us her exercise sequence of 36 movements. In sharing her technique and her secrets of longevity, Poa hopes to plant seeds to take root for the next generation. In service of her goal, Laura Nova created these kick cards to allow audiences step-by-step guidance.",
    reference :"",
    inner_page_photo :"https://centerforbookarts.org/wp-content/uploads/2023/09/LauraNova_KickCards.png",

      },
  }) 
  console.log(user)

  
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

  const user = await prisma.user.create({
   data:{
      name:"Jack",
      email:"test3.gmail.com",

      },
  })
*/
//main()
//get_user()
//read()
donothing()
.catch(e=>{
  console.error(e.message)

})
.finally(async()=>{
  await prisma.$disconnect()
})