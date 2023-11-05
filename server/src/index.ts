import fs from 'fs';
import express from 'express';
import{hey } from './helper.js';
import resources from './pages/resources'
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/',(req,res) =>{
  res.send('Hello');
});

app.get('/resources_data',(req,res) =>{
  console.log("resources")
  res.json(resources);
});

app.listen(5002,()=> console.log('server running'));