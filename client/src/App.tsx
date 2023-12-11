import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import { Home } from "./pages/Home.tsx"
import { Resource } from "./pages/Resources.tsx"
import { Post } from "./pages/Post.tsx"
import { DetailsPage } from "./pages/DetailsPage.tsx"
import Search from "./pages/Search.tsx"

import { Contact } from './pages/Contact.tsx';
import { About } from './pages/About.tsx';

import UserProfile from "./pages/UserProfile.tsx"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>     
        <Route path='/resources' element={<Resource/>}/> 
        <Route path='/search' element={<Search/>}/> 
        <Route path='/post-artbook' element={<Post/>}/>
        <Route path="/details/:id" element={<DetailsPage/>} />
        <Route path="/profile/:id" element={<UserProfile/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  )
}

export default App
