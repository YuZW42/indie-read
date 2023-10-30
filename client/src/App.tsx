import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import { Home } from "./pages/Home.tsx"
import { Resources } from "./pages/Resources.tsx"

function App() {
  return (
    <>
      <Routes>                
        <Route path='/' element={<Home/>}/>     
        <Route path='/resources' element={<Resources/>}/>                   
      </Routes>
    </>
  )
}

export default App
