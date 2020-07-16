import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Tooltip, Button, Alert } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { onUserCreate } from '../actions';

const RegisterForm = props => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');

  const { username, password, confirmPassword } = formData;
  const { user: { loading, error }, onUserCreate } = props;

  const onValueChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSignupClick = () => {
    setPasswordError('');

    if (password === confirmPassword) {
      onUserCreate({ username, password });
    } else {
      setPasswordError('The passwords do not match.');
    }
  }

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
      {error.username && error.username.length && (
        <div><Alert message={error.username[0]} type="error" /><br /></div>
      )}
      <Input.Password
        placeholder="password"
        name="password"
        value={password}
        onChange={onValueChange}
        prefix={<KeyOutlined />}
      />
      <br />
      <br />
      {error.password && error.password.length && (
        <div><Alert message={error.password[0]} type="error" /><br /></div>
      )}
      <Input.Password
        placeholder="confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onValueChange}
        prefix={<KeyOutlined />}
      />
      <br />
      <br />
      {passwordError && <div><Alert message={passwordError} type="error" /><br /></div>}
      <Tooltip title='Sign Up'>
        <Button type="primary" onClick={onSignupClick} loading={loading}>Sign Up</Button>
      </Tooltip>
    </div >
  );
}

RegisterForm.propTypes = {
  user: PropTypes.object.isRequired,
  onUserCreate: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps, { onUserCreate })(RegisterForm);