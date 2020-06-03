import React from 'react';
import { connect } from 'react-redux';
import { Card, Input, Tooltip, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { onUserLogin, onUserValueChange, onUserCreate } from '../actions';

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
  state = { selectedTab: 'login' };

  onLoginClick = () => this.props.onUserLogin({ username: this.props.username, password: this.props.password });

  onSignupClick = () => {
    if (this.props.password === this.state.confirmPassword) {
      this.props.onUserCreate({ username: this.props.username, password: this.props.password });
    }
  }

  loginFormRender = () => {
    return (
      <div>
        <Input
          placeholder="username"
          value={this.props.username}
          onChange={event => this.props.onUserValueChange({ username: event.target.value })}
          prefix={<UserOutlined />}
        />
        <br />
        <br />
        <Input.Password
          placeholder="password"
          value={this.props.password}
          onChange={event => this.props.onUserValueChange({ password: event.target.value })}
          prefix={<KeyOutlined />}
        />
        <br />
        <br />
        <Tooltip title='Log In'>
          <Button type="primary" onClick={this.onLoginClick} loading={this.props.loading}>Log In</Button>
        </Tooltip>
      </div>
    )
  }

  signupFormRender = () => {
    return (
      <div>
        <Input
          placeholder="username"
          value={this.props.username}
          onChange={event => this.props.onUserValueChange({ username: event.target.value })}
          prefix={<UserOutlined />}
        />
        <br />
        <br />
        <Input.Password
          placeholder="password"
          value={this.props.password}
          onChange={event => this.props.onUserValueChange({ password: event.target.value })}
          prefix={<KeyOutlined />}
          />
        <br />
        <br />
        <Input.Password
          placeholder="confirm password"
          value={this.props.confirmPassword}
          onChange={event => this.props.onUserValueChange({ confirmPassword: event.target.value })}
          prefix={<KeyOutlined />}
        />
        <br />
        <br />
        <Tooltip title='Sign Up'>
          <Button type="primary" onClick={this.onSignupClick} loading={this.props.loading}>Sign Up</Button>
        </Tooltip>
      </div>
    )
  }

  onTabChange = key => this.setState({ selectedTab: key });

  render() {
    const tabsContent = { login: this.loginFormRender, signup: this.signupFormRender }

    return (
      <div className='login-screen-container'>
        <Card
          title="Django Channels Chat"
          tabList={tabsList}
          style={{ width: '30%' }}
          activeTabKey={this.state.selectedTab}
          onTabChange={this.onTabChange}
        >
          {tabsContent[this.state.selectedTab]()}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username, password, confirmPassword, loading } = state.user;
  return { username, password, confirmPassword, loading };
}

export default connect(mapStateToProps, { onUserLogin, onUserValueChange, onUserCreate })(Login);