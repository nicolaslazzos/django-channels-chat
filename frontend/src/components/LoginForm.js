import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Tooltip, Button, Alert } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { onUserLogin } from '../actions';

const LoginScreen = props => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const { username, password } = formData;
  const { user: { loading, error }, onUserLogin } = props;

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
      {error.non_field_errors && error.non_field_errors.length && (
        <div><Alert message={error.non_field_errors[0]} type="error" /><br /></div>
      )}
      <Tooltip title='Log In'>
        <Button type="primary" onClick={onLoginClick} loading={loading}>Log In</Button>
      </Tooltip>
    </div>
  );
}

LoginScreen.propTypes = {
  user: PropTypes.object.isRequired,
  onUserLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps, { onUserLogin })(LoginScreen);