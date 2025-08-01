import { Tabs } from "antd"
import OwnedTheatre from "./OwnedTheatre";


function Partner() {
  const onTabChange = (e)=>{

  }
  const items = [
    {
      key: '1',
      label: 'Theatres',
      children: <OwnedTheatre/>,
    },
  ];
  return (
    <div>
        <h1 style={{display:"flex", justifyContent:"center", fontFamily:"monospace" }}>You are a&nbsp;<span style={{color:"#9d50bb"}}>PARTNER</span></h1>
      <Tabs defaultActiveKey="1" items ={items} onChange={onTabChange}/>
    </div>
  )
}

export default Partner
