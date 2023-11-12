
import Nav from 'react-bootstrap/Nav';
import {BsPlusLg} from 'react-icons/bs'

import "../home/module.home.css"

export const PostButton = () => {
  return (
    <div>
        <Nav.Link href='/post-artbook' className='post-btn'><BsPlusLg/></Nav.Link>
    </div>
  )
}
