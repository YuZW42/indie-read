import React from 'react'
import "./module.shared.css"

export const Header = () => {
  return (
    <div className='header-section'>
      <div className='logo'>
        {/* <img src="../../images/logo.jpg" alt="logo" /> */}
        <h1>Book Arts Catalog</h1>
      </div>
      <div>
        <div className='pfp'></div>
      </div>
    </div>
  )
}
