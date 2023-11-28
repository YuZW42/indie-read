// import logo from "../../images/logo.jpg"
import "./module.shared.css"
import {CgProfile} from "react-icons/cg"
import User from './UserLogin'
export const Header = () => {

  return (
    <div className='header-section'>
      <div className='logo'>
        {/* <img src="../../images/logo.jpg" alt="logo" /> */}
        <h1>Book Arts Catalog</h1>
      </div>
      <div >
        <CgProfile className="pfp"/>
       
        {/* <img src={pfp} alt="Profile Picture" className="pfp"/> */}
      </div>
      
      
    </div>
  )
}
