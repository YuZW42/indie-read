// import logo from "../../images/logo.jpg"
import "./module.shared.css"
import {CgProfile} from "react-icons/cg"
// import User from './UserLogin'

import Navbar from "../shared/NavBar"

export const Header = () => {

  return (
    <div className='header-section'>
      <div className='logo'>
        {/* <img src="../../images/logo.jpg" alt="logo" /> */}
        <h1>Book Arts Catalog</h1>
      </div>


      <Navbar/>


      <div >
        <CgProfile className="pfp"/>
        {/* <img src={pfp} alt="Profile Picture" className="pfp"/> */}
      </div>
    
    </div>
  )
}
