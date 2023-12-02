import prisma from '../shared/prismaclient';

async function save( id:string, bookId:number) {
  
  try {
    // Find all users with the provided email
    const usersWithEmail = await prisma.user.findMany({ where: { email: id } });

    // Perform update logic for each user
    for (const user of usersWithEmail) {
      try {
        // Perform update for each user
        const updatedUser = await prisma.user.update({
          where: { id: user.id }, // Use the actual unique identifier field (e.g., id)
          data: {
            favBook: {
              push: bookId,
            },
          },
        });

        console.log(`Book added to favorites for user with id ${user.id}`);
        // You can do additional handling or logging here
      } catch (error) {
        console.error(`Error updating user with id ${user.id}: ${error.message}`);
        // Handle errors during update for specific users
      }
    }

    return { message: 'Books updated for users with the provided email' };
  } catch (error) {
    return { error: error.message };
  }
}

export default save;
