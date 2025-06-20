import { Button, Tabs } from "antd"
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
    <div>
      <Tabs defaultActiveKey="1" items ={items} onChange={onTabChange}/>
    </div>
  )
}

export default Admin
