import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

import { Footer } from "../components/shared/Footer";
import Navbar from "../components/shared/NavBar";

import logo from "../assets/final_logo.png";
import pfp from "../assets/ABC_avatart-02.png";

import User from "../components/shared/UserLogin";
import Fav from "../components/login/Favorite";
import logout from "../components/login/Logout";

import axios from "axios";

import { Spinner } from "react-bootstrap";
import { Nav } from "react-bootstrap";

import "../components/profile/module.profile.css";

interface UserData {
  email: string;
  name: string | null;
  createdAt: string;
  id: string;
  isCreator: boolean;
  preference: any;
  role: string;
  userPreferenceId: string | null;
  favBook: any;
}

const UserProfile = () => {
  // const { id } = useParams();

  const [user, setUser] = useState<UserData|null>(null);

  const google = () => {
    window.open("https://indie-read-yuzw42.vercel.app/auth/google", "_self");
  };

  //experiement
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://indie-read-yuzw42.vercel.app/user?list=${user?.email}`
      );
      if (response.status === 200) {
        const userData = response.data;
        console.log("sucess");
        setUser(userData);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    await logout();

    setUser(null);
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
      <div id="header-container">
        <Nav.Link href="/">
          <img src={logo} alt="website logo" />
        </Nav.Link>
        <Navbar />
      </div>

        {user ? (
          <div id="user-profile-container">
            <img src={pfp} alt="profile icon of a blue cartoon frog smiling" />
            <h3 className="username">
              {user ? "Welcome, " + user.name : "Username Not Found."}
            </h3>
            <div className="user-btn-container">
              <button>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div id="user-profile-container">
            <img src={pfp} alt="profile icon of a blue cartoon frog smiling" />
            <div className="user-btn-container">
              <button id="login-btn" onClick={google}>Login</button>
            </div>
          </div>
        )}

      <User setUser={setUser} />

      {user ? (
        <div>
          <Fav preference={user.preference} />

          <div className="refresh-container">
            <p>Don't see your bookmarks? Try refreshing!</p>
            <button className="refresh-btn" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </div>
      ) : (
        <div className="fav-books-container">
          <Spinner className="primary" />
          <p>To See Latest Data, Please Login</p>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UserProfile;
