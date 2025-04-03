import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import './Auth.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [useEmail, setUseEmail] = useState(true);
  return (
    <div className="auth-container">
      <Card title="Hello Welcome!" className="auth-card">
        <Form layout="vertical"> 
          <Form.Item 
            label='Name'
            name='name'
            rules={[{ required: true, message: "Please enter your Name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {useEmail ? (
            <Form.Item 
            className='email-num'
              label='Email'
              name='email'
              rules={[{ required: true, message: "Please enter your Email id to proceed" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
          ) : (
            <Form.Item 
            className='email-num'
              label='Number'
              name='number'
              rules={[{ required: true, message: "Please enter your number" }]}
            >
              <Input placeholder="Enter your number" />
            </Form.Item>
          )}
          <Form.Item>
            <p onClick={() => setUseEmail(!useEmail)}>
              Register using {useEmail ? 'Mobile' : 'Email'}
            </p>
          </Form.Item>
          <Form.Item 
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please enter a Password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <p type="primary" htmlType="submit" block>
              Aldready an user? <Link to='/login'>Login</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
