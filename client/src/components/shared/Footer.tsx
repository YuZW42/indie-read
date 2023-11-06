// import React from 'react'
import "./module.shared.css"

export const Footer = () => {
  return (
    <div className='d-flex align-items-center justify-content-center text-center p-3' style={{height:'30vh' }}>
        &copy; {new Date().getFullYear()} Copyright: 
        <a className='text-dark' href='#'> Indie Art Reads </a>
    </div>
  )
}
