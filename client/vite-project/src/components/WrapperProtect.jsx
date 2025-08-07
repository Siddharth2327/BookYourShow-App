import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../ApiCalls/users';
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setUser } from "../redux/userSlice";

function WrapperProtect({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const handleMenuClicks = (e) => {
    if (e.key === "Home") {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
    navigate('/login');
  };

  const navitems = [
    {
      key: "Home",
      label: "Home",
      icon: <HomeOutlined />
    },
    {
      key: "user-menu",
      label: user ? user.name : "",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span onClick={() => {
              if (user.role === 'admin') {
                navigate('/admin');
              } else if (user.role === 'partner') {
                navigate('/partner');
              } else {
                navigate('/user');
              }
            }}>
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />
        },
        {
          key: "logout",
          label: (
            <span onClick={handleLogout}>
              Log Out
            </span>
          ),
          icon: <LogoutOutlined />
        }
      ]
    }
  ];

  const getValidUser = useCallback(async () => {
    try {
      const response = await GetCurrentUser();
      if (response && response.success && response.data) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setUser(null));
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.log('Error while getting valid user', error);
      dispatch(setUser(null));
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    // Only attempt to get user if token exists
    if (localStorage.getItem('token')) {
      getValidUser();
    } else {
      navigate('/login');
    }
  }, [getValidUser, navigate]);

  // Only show layout if user data exists
  if (!user) return null;

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <h3
            className="demo-logo text-white m-0"
            style={{
              color: "white",
              marginRight: "auto",
              minWidth: "150px",
            }}
          >
            Book My Show
          </h3>
          <Menu
            theme="dark"
            mode="horizontal"
            items={navitems}
            onClick={handleMenuClicks}
            style={{
              flex: 1,
              minWidth: 0,
              justifyContent: "flex-end",
              border: "none",
            }}
            className="custom-menu"
          />
          <style jsx>{`
            .custom-menu .ant-menu-item:hover,
            .custom-menu .ant-menu-submenu:hover,
            .custom-menu .ant-menu-item-selected,
            .custom-menu .ant-menu-submenu-selected {
              background-color: transparent !important;
            }
            .custom-menu .ant-menu-item::after,
            .custom-menu .ant-menu-submenu::after {
              display: none !important;
            }
          `}</style>
        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </>
  );
}

export default WrapperProtect;
