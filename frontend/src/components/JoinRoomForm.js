import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Tooltip, Input, Alert } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { onRoomJoin } from '../actions';

const JoinRoomForm = props => {
  const [formData, setFormData] = useState({ id: '', password: '' });

  const { id, password } = formData;
  const { rooms: { loading, error }, onRoomJoin } = props;

  const onValueChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onJoinRoomClick = () => password && onRoomJoin({ room: id, password });

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
      <Tooltip title='Join Room'>
        <Button type="primary" onClick={onJoinRoomClick} loading={loading}>Join Room</Button>
      </Tooltip>
    </div>
  );
}

JoinRoomForm.propTypes = {
  rooms: PropTypes.object.isRequired,
  onRoomJoin: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { rooms: state.rooms };
}

export default connect(mapStateToProps, { onRoomJoin })(JoinRoomForm);