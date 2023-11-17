import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  googleId: string;
  username: string;
  name: string;

}

const UserDetails = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/auth/login/success', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setUserData(response.data.user as UserData); 
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome, {userData.name.givenName} {userData.name.familyName}!</h2>
          <p>ID: {userData.googleId}</p>
          <p>Name: {userData.name}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
