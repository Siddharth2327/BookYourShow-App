import './App.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import WrapperProtect from './components/WrapperProtect.jsx'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<WrapperProtect><Home/></WrapperProtect>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
