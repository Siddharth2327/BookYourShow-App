import './App.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Admin'
import Partner from './pages/Partner'
import UserProfile from './pages/UserProfile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import WrapperProtect from './components/WrapperProtect.jsx'
import MovieForm from './pages/Admin/MovieForm.jsx'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<WrapperProtect><Home/></WrapperProtect>}/>
      <Route path="/admin" element={<WrapperProtect><Admin/></WrapperProtect>}/>
      <Route path="/partner" element={<WrapperProtect><Partner/></WrapperProtect>}/>
      <Route path="/user" element={<WrapperProtect><UserProfile/></WrapperProtect>}/>
      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
