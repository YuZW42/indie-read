import { useState,useEffect } from 'react';
import NavBar from "../components/shared/NavBar"
import { Header } from "../components/shared/Header"
import User from '../components/shared/UserLogin' 
import logout from "../components/login/Logout"
import Fav from "../components/login/Favorite"
import axios from 'axios';
interface UserData {
  email: string;
  name: string;
  createdAt: string;
  id: string;
  isCreator: boolean;
  preference: any;
  role: string;
  userPreferenceId: string | null;
  favBook:any;
}

 const Login = () => {
  const [user, setUser] = useState<UserData | null>(null);

  const google=()=>{
    window.open("http://localhost:5002/auth/google","_self")
  }
  const handleLogout = async () => {
 await logout();

      setUser(null); 

  };
  //experiement
  const fetchUserData = async () => {
    
      try {
        const response = await axios.get(`http://localhost:5002/user?list=${user?.email}`);
        if (response.status === 200) {
          const userData = response.data;
          console.log('sucess')
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
 

  // Function to handle refresh button click
  const handleRefresh = () => {
    fetchUserData();
  };

  useEffect(() => {
    // Fetch initial user data when the component mounts
    fetchUserData();
  }, []);

  return (
<>
      <Header/>
      <NavBar/>
      <button onClick={google}> Login</button>
      <User setUser={setUser} />
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <Fav preference={user.preference} /> 
          <button onClick={handleRefresh}>Refresh</button>

        </div>
      ) : (
        <p>Loading...</p>

        
      )}
    </>
  )
}

export default Login