// import React from "react";
import Navbar from "../components/shared/NavBar";
import { CgProfile } from "react-icons/cg";

import { Button } from "react-bootstrap";

import "../components/profile/module.profile.css";
import img from "../images/placeholder.png"

// import { Container, Row, Col, Card, Pagination, Form } from "react-bootstrap";

export const Profile = () => {
  return (
    <div className="parent-container">
      <div className="header-container">
        <h1>Book Arts Reads</h1>
        <Navbar />
        <Button>Submit!</Button>
      </div>

      <div className="profile-container">
        <CgProfile className="pfp" />
        <h1>Username</h1>
        <Button>Edit Profile</Button>
      </div>

      <div className="info-container">
        <div className="collections">
            <Button>My Collections</Button>
            <Button>My Posts</Button>
        </div>

        <div>
            <img src={img}/>
            <img src={img}/>
            <img src={img}/>
        </div>
      </div>
    </div>
  );
};
