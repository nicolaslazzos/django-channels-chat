import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Tooltip, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { onUserCreate } from '../actions';

const RegisterForm = props => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

  const { username, password, confirmPassword } = formData;
  const { loading, onUserCreate } = props;

  const onValueChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSignupClick = () => {
    if (password === confirmPassword) {
      onUserCreate({ username, password });
    } else {
      alert('The passwords do not match!');
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
      <Input.Password
        placeholder="password"
        name="password"
        value={password}
        onChange={onValueChange}
        prefix={<KeyOutlined />}
      />
      <br />
      <br />
      <Input.Password
        placeholder="confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onValueChange}
        prefix={<KeyOutlined />}
      />
      <br />
      <br />
      <Tooltip title='Sign Up'>
        <Button type="primary" onClick={onSignupClick} loading={loading}>Sign Up</Button>
      </Tooltip>
    </div>
  );
}

RegisterForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onUserCreate: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { loading: state.user.loading };
}

export default connect(mapStateToProps, { onUserCreate })(RegisterForm);