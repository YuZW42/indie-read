import { useState } from 'react';
import NavBar from "../components/shared/NavBar"
import { Header } from "../components/shared/Header"
import User from '../components/shared/UserLogin' 
import logout from "../components/login/Logout"
import Fav from "../components/login/Favorite"
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Login