import logo from "../../assets/final_logo.png"
import {CgProfile} from "react-icons/cg"
import Navbar from "../shared/NavBar"

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
        <CgProfile className="pfp"/>
        {/* <img src={pfp} alt="Profile Picture" className="pfp"/> */}
      </div>
    
    </div>
  )
}
