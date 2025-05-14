import{ useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import './Auth.css';
import { Link, useNavigate} from 'react-router-dom';
import { RegisterUser } from '../ApiCalls/users';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registeredData = async (values) => {
    try {
      setLoading(true);
      const response = await RegisterUser(values);
      console.log("Server response", response); // response message from server which we already given in userroute

      if(response.success) {
        alert('User registered successfuly')  
        // navigate to login page
        navigate('/login')   
      }
      else{

      }
      if(!response) alert('User already exist') // to give the user alert message
      
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card title="Hello Welcome!" className="auth-card">
        <Form layout="vertical" onFinish={registeredData}>
          <Form.Item 
            label='Name' 
            name='name' 
            rules={[{ required: true, message: "Please enter your Name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <p>
              Already a user? <Link to='/login'>Login</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;