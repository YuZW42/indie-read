// import React from 'react'
import "./module.shared.css"

export const Footer = () => {
  return (
    <div className='footer-container' style={{height:'30vh' }}>
        &copy; {new Date().getFullYear()} Copyright: 
        <strong><a className='text-dark' href='/'> Art Book Collective </a></strong>
    </div>
  )
}
