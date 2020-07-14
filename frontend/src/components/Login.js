import React, { useState } from 'react';
import { Card } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = () => {
  const [selectedTab, setSelectedTab] = useState('login');

  const onTabChange = tab => setSelectedTab(tab);

  const tabsList = [{ key: 'login', tab: 'Log In', }, { key: 'signup', tab: 'Sign Up', }];
  const tabs = { login: <LoginForm />, signup: <RegisterForm /> };

  return (
    <div className='login-screen-container'>
      <Card
        title="Django Channels Chat"
        tabList={tabsList}
        style={{ width: '40%' }}
        activeTabKey={selectedTab}
        onTabChange={onTabChange}
      >
        {tabs[selectedTab]}
      </Card>
    </div>
  );
}

export default Login;