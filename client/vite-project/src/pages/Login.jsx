import React from 'react'
import './Auth.css';
import { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
function Login() {

  const[useEmail, setUseEmail] = useState(true);
  return (
    <div className="auth-container">
          <Card title="Welcome back!" className="auth-card">
            <Form layout="vertical">
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
                <p onClick={()=> setUseEmail(!useEmail)} href="#">Login using {useEmail ? 'Mobile' : 'Email'}</p>
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
                  Login
                </Button>
              </Form.Item>
    
              <Form.Item>
                <p href="#" type="primary"  block>
                  New user?<Link to='/register'>Register</Link>
                </p>
              </Form.Item>
            </Form>
          </Card>
        </div>
  )
}

export default Login
