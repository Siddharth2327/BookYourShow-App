// This is the wrapper component which gives access to the home page
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function WrapperProtect({children}) { // children represents the home which is passed as the child
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        else navigate('/')
        // we are already on the home page if this component gets triggered so we dont need to add the else block to navigate to the homepage
    },[])
  return (
    <div>
      {children} 
    </div>
  )
}

export default WrapperProtect
