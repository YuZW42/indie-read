import React from 'react'
import Nav from 'react-bootstrap/Nav';

import "../home/module.home.css"

export const PostButton = () => {
  return (
    <div>
        <Nav.Link href='/post-artbook' className='post-btn'>+</Nav.Link>
    </div>
  )
}
