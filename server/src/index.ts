import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import prisma from './pages/shared/prismaclient';

import resources from './pages/resource/resources';
import search from './pages/search/searchquery';
import authRoute from './pages/login/google';
import save_fav from './pages/save_fav/save_fav'
import display_fav from './pages/save_fav/display_fav'
const app = express();
const port: number = parseInt(process.env.PORT as string, 10) || 5002;

app.use(
  cookieSession({
    name: 'session',
    keys: ['indie-book'],
    maxAge: 24 * 60 * 60 * 100
  })
)

app.use(passport.initialize());
app.use(passport.session())

app.use(cors({
  origin: 'indie-read-production.up.railway.app',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.get('/',(req,res) =>{
  res.send('Hello');
});

app.get('/resources_data', (req, res) => {
  res.json(resources);
});

app.get('/search_keyword', async(req,res) =>{
  const keyword:string = req.query.keyword as string;
  try{
    const books = await search(keyword);
    console.log(books);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }


});
app.get('/save_fav',async(req,res) =>{
  const { id, bookId } = req.query;
  console.log(id,bookId)
  try {
    const result = await save_fav(String(id), Number(bookId));
    
    res.status(200).json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/get_fav',async(req,res) =>{

  const preference = req.query;
  
  try {
    const result = await display_fav( preference);
    
    res.status(200).json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})

// Add this route to retrieve user data by ID
app.get('/user', async (req, res) => {
  try {
    
    const userEmail = req.query.list as string; // Extract the email from the query params
    
    if (!userEmail) {
      return res.status(400).json({ message: 'Email parameter is missing' });
    }

    // Retrieve the user data based on the user's email
    const user = await prisma.user.findFirst({
      where: { email: userEmail },
      // Include additional fields if needed
      include: { /* additional fields */ }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({ message: 'Error retrieving user data' });
  }
});


app.get('/api/healthchecker', (_, res) => {
  res.status(200).json({
    status: 'success',
    message: 'server running'
  });
});


app.use('/auth', authRoute);



app.listen(port, "0.0.0.0", function () {
  console.log(`Server running on port ${port}`)
});