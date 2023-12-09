// import React from 'react'
import "./module.shared.css"

export const Footer = () => {
  return (
    <div className='footer-container' style={{height:'30vh' }}>
        &copy; {new Date().getFullYear()} Copyright: 
        <a className='text-dark' href='#'> Book Art Collective </a>
    </div>
  )
}
