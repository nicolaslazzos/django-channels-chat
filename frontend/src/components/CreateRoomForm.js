import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Tooltip, Input, Alert } from 'antd';
import { UserOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons';
import { onRoomCreate } from '../actions';

const CreateRoomForm = props => {
  const [passwordError, setPasswordError] = useState('')
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    password: '',
    confirmPassword: ''
  });

  const { id, label, password, confirmPassword } = formData;
  const { rooms: { loading, error }, onRoomCreate } = props;

  const onValueChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCreateRoomClick = () => {
    setPasswordError('')

    if (password === confirmPassword) {
      onRoomCreate({ id, label, password });
    } else {
      setPasswordError('The passowrds do not match.');
    }
  }

  return (
    <div>
      <Input
        placeholder="room name"
        name="id"
        value={id}
        onChange={onValueChange}
        prefix={<UserOutlined />}
      />
      <br />
      <br />
      {error.id && error.id.length && (
        <div><Alert message={error.id[0]} type="error" /><br /></div>
      )}
      <Input
        placeholder="room label"
        name="label"
        value={label}
        onChange={onValueChange}
        prefix={<HomeOutlined />}
      />
      <br />
      <br />
      {error.label && error.label.length && (
        <div><Alert message={error.label[0]} type="error" /><br /></div>
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
      {passwordError && (
        <div><Alert message={passwordError} type="error" /><br /></div>
      )}
      <Tooltip title='Create Room'>
        <Button type="primary" onClick={onCreateRoomClick} loading={loading}>Create Room</Button>
      </Tooltip>
    </div>
  );
}

CreateRoomForm.propTypes = {
  rooms: PropTypes.object.isRequired,
  onRoomCreate: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { rooms: state.rooms };
}

export default connect(mapStateToProps, { onRoomCreate })(CreateRoomForm);