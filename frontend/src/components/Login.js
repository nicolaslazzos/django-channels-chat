import React from 'react';
import { Card, Input, Tooltip, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

const tabsList = [
  {
    key: 'login',
    tab: 'Log In',
  },
  {
    key: 'signup',
    tab: 'Sign Up',
  },
];

class Login extends React.Component {
  state = {
    selectedTab: 'login',
    tabsContent: {
      login: (
        <div>
          <Input placeholder="username" prefix={<UserOutlined />} />
          <br />
          <br />
          <Input.Password placeholder="password" prefix={<KeyOutlined />} />
          <br />
          <br />
          <Tooltip title='Log In'>
            <Button type="primary" onClick={this.props.onLogin}>Log In</Button>
          </Tooltip>
        </div>
      ),
      signup: (
        <div>
          <Input placeholder="username" prefix={<UserOutlined />} />
          <br />
          <br />
          <Input.Password placeholder="password" prefix={<KeyOutlined />} />
          <br />
          <br />
          <Input.Password placeholder="confirm password" prefix={<KeyOutlined />} />
          <br />
          <br />
          <Tooltip title='Sign Up'>
            <Button type="primary">Sign Up</Button>
          </Tooltip>
        </div>
      ),
    }
  };

  onTabChange = key => this.setState({ selectedTab: key });

  render() {
    return (
      <div className='login-screen-container'>
        <Card
          title="Django Channels Chat"
          tabList={tabsList}
          style={{ width: '30%' }}
          activeTabKey={this.state.selectedTab}
          onTabChange={this.onTabChange}
        >
          {this.state.tabsContent[this.state.selectedTab]}
        </Card>
      </div>
    );
  }
}

export default Login;