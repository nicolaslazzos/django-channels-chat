import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Tooltip, Input } from 'antd';
import { UserOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons';
import { onRoomCreate } from '../actions';

const CreateRoomForm = props => {
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    password: '',
    confirmPassword: ''
  });

  const { id, label, password, confirmPassword } = formData;
  const { loading, onRoomCreate } = props;

  const onValueChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCreateRoomClick = () => {
    if (password === confirmPassword) {
      onRoomCreate({ id, label, password });
    } else {
      alert('The passowrds do not match');
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
      <Input
        placeholder="room label"
        name="label"
        value={label}
        onChange={onValueChange}
        prefix={<HomeOutlined />}
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
        name="confirmPassowrd"
        value={confirmPassword}
        onChange={onValueChange}
        prefix={<KeyOutlined />}
      />
      <br />
      <br />
      <Tooltip title='Create Room'>
        <Button type="primary" onClick={onCreateRoomClick} loading={loading}>Create Room</Button>
      </Tooltip>
    </div>
  );
}

CreateRoomForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onRoomCreate: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { loading: state.rooms.loading };
}

export default connect(mapStateToProps, { onRoomCreate })(CreateRoomForm);