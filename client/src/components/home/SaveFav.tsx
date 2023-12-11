import axios from "axios";
import { useState } from "react";

interface UserData {
  email: string;
  name: string;
  createdAt: string;
  id: string;
  isCreator: boolean;
  preference: any;
  role: string;
  userPreferenceId: string | null;
}

const useHandleClick = (bookId: number) => {
  const [user, setUser] = useState<UserData | null>(null);
  console.log(bookId)

  const handleClick = async (bookId: number) => {
    try {
      const response = await axios.get('http://localhost:5002/auth/login/success', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setUser(response.data.user as UserData);

        if (response.data.user) {
          const result = await axios.get('http://localhost:5002/save_fav', {
            params: {
              id: response.data.user.email,
              bookId: bookId
            },
          });
          console.log(result.data);
          // Handle result.data as needed
        } else {
          console.log('User not logged in');
          // Handle case where user is not logged in
        }
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors as needed
    }
  };

  return { handleClick, user };
};

export default useHandleClick;
