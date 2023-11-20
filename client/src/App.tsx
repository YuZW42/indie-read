import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import { Home } from "./pages/Home.tsx"
import { Resource } from "./pages/Resources.tsx"
import { Login } from "./pages/Login.tsx"
import { DetailsPage } from "./pages/DetailsPage.tsx"
import Search from "./pages/Search.tsx"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>     
        <Route path='/resources' element={<Resource/>}/> 
        <Route path='/search' element={<Search/>}/> 
        <Route path='/post-artbook' element={<Login/>}/>
        <Route path="/details/:id" element={<DetailsPage/>} />
      </Routes>
    </>
  )
}

export default App
