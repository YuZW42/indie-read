
import axios from "axios";

const logout = async () => {
  try {
    
    const response = await axios.get('http://localhost:5002/auth/logout', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("r",response.data)
    console.log("finished")
    
    
    return response.data; 
  } catch (error) {
    console.error(error);
    throw new Error('Failed to logout'); 
  }
};

export default logout;
