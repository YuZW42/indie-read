import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';

import resources from './pages/resource/resources';
import search from './pages/search/searchquery';
import authRoute from './pages/login/google';
import save_fav from './pages/save_fav/save_fav'
const app = express();
const port = 5002

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
  origin: 'http://localhost:5173',
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
    
    res.status(200).json(result); // Send the result back as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and send as JSON response
  }
})


app.get('/api/healthchecker', (_, res) => {
  res.status(200).json({
    status: 'success',
    message: 'server running'
  });
});


app.use('/auth', authRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));