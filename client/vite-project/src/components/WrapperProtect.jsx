// This is the wrapper component which gives access to the home page
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../ApiCalls/users';
import { message, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function WrapperProtect({children}) { // children represents the home which is passed as the child
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.user);

    const handlemenuclicks = (e)=>{
      if(e.key == "Home"){
        navigate('/');
      }
    }
    const navitems = [
      {
        key:"Home",
        label: "Home",
        icon: <HomeOutlined />,
      },

      {
        key:"user-menu",
        label :`${user ? user.name : ""}`, // check for the user name if available set the name or else an empty space (null)
        icon : <UserOutlined/>,
        children:[
          {
            label:(
              <span
              onClick={()=>{
                if(user.role === 'admin'){
                  navigate('/admin')
                }
                else if(user.role === 'partner'){
                  navigate('/partner')
                }
                else navigate('/user')
              }}
              >
              My Profile
              </span>
            ),
            icon:<ProfileOutlined/>,
          },
          {
            key:"logout",
            label:(
              <Link
              to="/login"
              onClick={()=> localStorage.removeItem('token')}
              >
              Log Out
              </Link>
            ),
            icon:<LogoutOutlined/>
          },
        ],
      },
    ];
    
// checking the validity of the user and set the user data to the state
    const getValidUser = useCallback(async ()=>{
      try{
        const response = await GetCurrentUser();
        console.log(response);
        dispatch(setUser(response.data));
      } catch(error){
        console.log('Error while getting valid user ', error);
        dispatch(setUser(null));
      }
    },[dispatch]);

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getValidUser()
        }
        else navigate('/login')
        // we are already on the home page if this component gets triggered so we don't need to add the else block to navigate to the homepage
    },[getValidUser, navigate])
    

  // "user && " => if the user is there then it shows the complete layout in the return statement  
  // this solves the issue of the user not being there when the page is loaded
  // after there is a user value in the state then the layout is shown
  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navitems} onClick={handlemenuclicks}/>
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default WrapperProtect
