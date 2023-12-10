import logo from "../../assets/final_logo.png"
import Navbar from "../shared/NavBar"
import pfp from "../../assets/ABC_avatart-02.png"

import { Nav } from "react-bootstrap"

import "./module.shared.css"
// import User from './UserLogin'

export const Header = () => {

  return (
    <div className='header-section'>
      <div className='logo'>
        <img src={logo} alt="logo" className="logo"/>
      </div>


      <Navbar/>


      <div >
        <Nav.Link href="/login"><img src={pfp} alt="profile image icon of a cartoon frog smiling" className="pfp-icon"/> </Nav.Link>
        {/* <img src={pfp} alt="Profile Picture" className="pfp"/> */}
      </div>
    
    </div>
  )
}
