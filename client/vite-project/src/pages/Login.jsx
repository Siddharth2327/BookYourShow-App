import { useState } from 'react';
import './Auth.css';
import { Form, Input, Button, Card } from 'antd';
import { Link, useNavigate} from 'react-router-dom';
import { LoginUser } from '../ApiCalls/users';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      // console.log("Login data:", values);
      const response = await LoginUser(values);
      console.log("server response:", response) // response message from server which we already given in userroute
      
      if(response.success) {
        localStorage.setItem("token", response.token)// this gets stored ion the local storage and can be used to login to the home page
        navigate('/')
      }
      else {
        alert("Unable to login")
        console.log('Cant move to homepage')
      }
      if(!response) alert("Email or Password incorrect") // to give the user alert message
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card title="Welcome back!" className="auth-card">
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item 
            className='email-num'
            label='Email'
            name='email'
            rules={[{ required: true, message: "Please enter your Email id to proceed" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item 
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please enter a Password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <p>
              New user? <Link to='/register'>Register</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;