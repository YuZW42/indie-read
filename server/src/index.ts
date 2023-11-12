import fs from 'fs';
import express from 'express';
import{hey } from './helper.js';
import resources from './pages/resource/resources'
import search from './pages/search/searchquery'

const cors = require('cors');
const app = express();
const port = 5002
app.use(cors());
app.get('/',(req,res) =>{
  res.send('Hello');
});

app.get('/resources_data',(req,res) =>{
  res.json(resources);
});

app.get('/search_keyword', async(req,res) =>{
  const keyword:string = req.query.keyword as string;
  try{
    const books = await search(keyword);
    console.log(books)
    res.json(books);
  }catch(error){
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
})

app.listen(port,()=> console.log(`server running on port ${port}`));