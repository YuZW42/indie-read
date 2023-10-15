import fs from 'fs';
import express from 'express';

import{hey } from './helper.js';

const app = express();
app.get('/',(req,res) =>{
  res.send('Hello');
});

app.listen(5001,()=> console.log('server running'));