import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, PageHeader, Button } from 'antd';
import { connect } from 'react-redux';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import NewRoomModal from './NewRoomModal';
import { onUserLogout, onRoomsValueChange } from '../actions';

const Header = props => {
  const { username, newRoomVisible, onUserLogout, onRoomsValueChange } = props;

  const toggleNewRoom = () => onRoomsValueChange({ newRoomVisible: !newRoomVisible });

  return (
    <React.Fragment>
      <PageHeader
        className="chat-header"
        title={`@${username}`}
        extra={[
          <Tooltip title="New Room" key='new-room'>
            <Button type="link" onClick={toggleNewRoom} icon={<PlusOutlined />} />
          </Tooltip>,
          <Tooltip title="Log Out" key='log-out'>
            <Button type="link" onClick={onUserLogout} icon={<LogoutOutlined />} />
          </Tooltip>,
        ]}
      />
      <NewRoomModal visible={newRoomVisible} onCancel={toggleNewRoom} />
    </React.Fragment>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  newRoomVisible: PropTypes.bool.isRequired,
  onUserLogout: PropTypes.func.isRequired,
  onRoomsValueChange: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { username } = state.user;
  const { newRoomVisible } = state.rooms;
  return { username, newRoomVisible };
}

export default connect(mapStateToProps, { onUserLogout, onRoomsValueChange })(Header);