import axios from 'axios';
import  Resource from './ResourceInterface'

const fetchData = async (): Promise<Resource[]> => {
  try {
  
    const response = await axios.get('https://indie-read-yuzw42.vercel.app/resources_data');
    
    console.log("express")
    return response.data;
  } catch (error:any) {
    console.error('Error:', error.message);
    return [];
  }
};

export default fetchData;
