import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import { Home } from "./pages/Home.tsx"
import { Resource } from "./pages/Resources.tsx"

function App() {
  return (
    <>
      <Routes>                
        <Route path='/' element={<Home/>}/>     
        <Route path='/resources' element={<Resource/>}/>                   
      </Routes>
    </>
  )
}

export default App
