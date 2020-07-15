import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Tooltip, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { onUserLogin } from '../actions';

const LoginScreen = props => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const { username, password } = formData;
  const { loading, onUserLogin } = props;

  const onValueChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onLoginClick = () => onUserLogin({ username, password });

  return (
    <div>
      <Input
        placeholder="username"
        name="username"
        value={username}
        onChange={onValueChange}
        prefix={<UserOutlined />}
      />
      <br />
      <br />
      <Input.Password
        placeholder="password"
        name="password"
        value={password}
        onChange={onValueChange}
        prefix={<KeyOutlined />}
      />
      <br />
      <br />
      <Tooltip title='Log In'>
        <Button type="primary" onClick={onLoginClick} loading={loading}>Log In</Button>
      </Tooltip>
    </div>
  );
}

LoginScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  onUserLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { loading: state.user.loading };
}

export default connect(mapStateToProps, { onUserLogin })(LoginScreen);