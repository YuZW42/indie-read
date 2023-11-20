import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  googleId: string;
  username: string;
  name: {
    givenName: string;
    familyName: string;
  };
  data: any;
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
        console.log(response.data.user.name)

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
          

          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;

//          <p>ID: {userData.data.user.name}</p>       <p>ID: {userData.data.user.name}</p>
   //       <p>Name : {userData.name.givenName}</p>