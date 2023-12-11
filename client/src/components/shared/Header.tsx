import logo from "../../assets/final_logo.png"
import Navbar from "../shared/NavBar"

import { ProfileIcon } from "../login/ProfileIcon"

import "./module.shared.css"
// import User from './UserLogin'

export const Header = () => {

  return (
    <div className='header-section'>
      <div className='logo'>
        <img src={logo} alt="logo" className="logo"/>
      </div>

      <Navbar/>

      <ProfileIcon/>
    </div>
  )
}
