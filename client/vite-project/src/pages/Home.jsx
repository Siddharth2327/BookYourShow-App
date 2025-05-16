import { useEffect } from "react"
import { GetCurrentUser } from "../ApiCalls/users"
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    async function fetchuser(){
      const userData = await GetCurrentUser();
      if(!userData.success) {
        localStorage.remove("token")
        navigate('/login')
      }
    }
    fetchuser();
  },[])

  return (
    <div>
      <h1>Hello from home page</h1>
    </div>
  )
}

export default Home
