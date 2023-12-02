import React, { useState, useEffect } from 'react';

interface UserData {
  id: string;
  name: string;
  createdAt: string;
  email: string;
  isCreator: boolean;
  preference: {};
  role: string;
  userPreferenceId: null;
  favBook: bigint[]; // Update the type here
}

const UserDetails = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    createdAt: '',
    email: '',
    isCreator: false,
    preference: {},
    role: '',
    userPreferenceId: null,
    favBook: [], // Update the initial state here
  });

  useEffect(() => {
    // Simulate fetching user data with dummy BigInts
    const dummyUserData: UserData = {
      id: '69c8b781-b9f0-4eb9-af64-6621ff1e58bd',
      name: 'yu zeng',
      createdAt: '2023-12-02T16:26:57.699Z',
      email: '115640783162715523277',
      isCreator: false,
      preference: {},
      role: 'BASIC',
      userPreferenceId: null,
      favBook: [1n, 3n, 5n, 5n], // Dummy BigInts
    };

    // Update state with the dummy user data
    setUserData(dummyUserData);
  }, []);

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      {/* Render other user details */}
      <p>Fav Books: {userData.favBook.join(', ')}</p> {/* Render BigInts as strings */}
    </div>
  );
};

export default UserDetails;
