import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  email: string;
  name: string;
  createdAt: string;
  id: string;
  isCreator: boolean;
  preference: any; 
  role: string;
  favBook: any;
  userPreferenceId: string | null;
}
interface UserDetailsProps {
  setUser: React.Dispatch<React.SetStateAction<UserData| null>>;
}

const UserDetails = ({ setUser }: UserDetailsProps) => {


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/auth/login/success', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("check",response.data.user)

        if (response.status === 200) {
          //setUserData(response.data.user as UserData); 
          setUser(response.data.user as UserData);
         
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        
        console.error(error);
      }
    };

    fetchData();
  }, [setUser]);



  return null
};

export default UserDetails;

//          <p>ID: {userData.data.user.name}</p>       <p>ID: {userData.data.user.name}</p>
   //       <p>Name : {userData.name.givenName}</p>