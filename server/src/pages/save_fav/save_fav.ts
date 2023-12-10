import prisma from '../shared/prismaclient';


async function save(id: string, bookId: number) {
  try {
    const usersWithEmail = await prisma.user.findMany({ where: { email: id } });

    for (const user of usersWithEmail) {
      try {
        const existingPreference = user.preference as any;
        let updatedQ: string = '';

        if (typeof existingPreference === 'string') {
          updatedQ = existingPreference;
        } else if (existingPreference && typeof existingPreference === 'object' && 'q' in existingPreference) {
          updatedQ = existingPreference.q as string;
        }

              
              const qArray: string[] = updatedQ.split(',').filter(item => item !== '');

              
              const bookIdExists = qArray.includes(String(bookId));
      
              if (bookIdExists) {
                
                const filteredQArray: string[] = qArray.filter(item => item !== String(bookId));
      
                
                updatedQ = filteredQArray.join(',');
              } else {
                
                qArray.push(String(bookId));
      
                
                updatedQ = qArray.join(',');
              }

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            preference: {
              q: updatedQ,
            },
          },
        });

        console.log(`Preference updated for user with id ${user.id}`);
 
      } catch (error) {
        console.error(`Error updating user with id ${user.id}: ${error.message}`);

      }
    }

    return { message: 'Preferences updated for users with the provided email' };
  } catch (error) {
    return { error: error.message };
  }
}



export default save;
