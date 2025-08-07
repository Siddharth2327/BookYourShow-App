import { Tabs } from "antd"
import TheatreList from "./TheatreList";
import MovieList from "./MovieList";


function Admin() {
  const onTabChange = (e)=>{

  }
  const items = [
    { 
      key: '1',
      label: 'Movies List',
      children: <MovieList/>,
    },
    {
      key: '2',
      label: 'Theatre List',
      children: <TheatreList/>,
    },
  ];
  return (
    <div><h1 style={{display:"flex", justifyContent:"center", fontFamily:"monospace" }}>You are the&nbsp;<span style={{color:"#9d50bb"}}>ADMIN</span></h1>
      <Tabs
      className="custom-tabs" 
      defaultActiveKey="1" 
      items ={items} 
      onChange={onTabChange}/>
    </div>
  )
}

export default Admin
