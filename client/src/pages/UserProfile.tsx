import { useState, useEffect } from 'react';
import { Header } from "../components/shared/Header"

import User from '../components/shared/UserLogin'
import logout from "../components/login/Logout"
import Fav from "../components/login/Favorite"

import axios from 'axios';

import { Spinner } from 'react-bootstrap';

interface UserData {
  email: string;
  name: string;
  createdAt: string;
  id: string;
  isCreator: boolean;
  preference: any;
  role: string;
  userPreferenceId: string | null;
  favBook: any;
}

const UserProfile = () => {
  const [user, setUser] = useState<UserData | null>(null);

  const google = () => {
    window.open("http://localhost:5002/auth/google", "_self")
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
      <Header />

      <User setUser={setUser} />

      {user ? (
        <div>
          <Fav preference={user.preference} />
          <button onClick={handleRefresh}>Refresh</button>

        </div>
      ) : (
        <div>
          <Spinner className='primary'/>
          <p>To See Latest Data, Please Login</p>
        </div>
      )}
    </>
  )
}

export default UserProfile