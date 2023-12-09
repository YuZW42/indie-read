// import React from 'react'
import "./module.shared.css"
import { Nav } from "react-bootstrap"

export const Footer = () => {
  return (
    <div className='footer-container' style={{height:'30vh' }}>
        &copy; {new Date().getFullYear()} Copyright: 
        <a className='text-dark' href='#'> Book Art Collective </a>

        <Nav.Link href="#">About</Nav.Link>
        <Nav.Link href="#">Contact</Nav.Link>
    </div>
  )
}
