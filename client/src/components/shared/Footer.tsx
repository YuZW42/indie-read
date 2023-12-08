// import React from 'react'
import "./module.shared.css"
import { Nav } from "react-bootstrap"

export const Footer = () => {
  return (
    <div className='footer-container' style={{height:'30vh' }}>
        &copy; {new Date().getFullYear()} Copyright: 

        <Nav.Link href="#">About Us</Nav.Link>
        <a className='text-dark' href='#'> Indie Art Reads </a>
    </div>
  )
}
