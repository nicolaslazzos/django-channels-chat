import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { connect } from 'react-redux';
import { onRoomDelete, onRoomLeave } from '../actions';

const RoomItem = props => {
  const { room, username, onRoomDelete, onRoomLeave, onRoomPress } = props;

  const actions = {
    delete: <a key="room-delete" onClick={() => onRoomDelete(room.id)}>delete</a>,
    leave: <a key="room-leave" onClick={() => onRoomLeave(room.id)}>leave</a>
  }

  return (
    <List.Item actions={[room.owner === username ? actions.delete : actions.leave]}>
      <a onClick={() => onRoomPress(room)}>
        <List.Item.Meta
          title={room.label}
          description={`@${room.id}`}
          style={{ alignItems: 'flex-start' }}
        />
      </a>
    </List.Item>
  );
}

RoomItem.propTypes = {
  username: PropTypes.string.isRequired,
  room: PropTypes.object.isRequired,
  onRoomDelete: PropTypes.func.isRequired,
  onRoomLeave: PropTypes.func.isRequired,
  onRoomPress: PropTypes.func
}

const mapStateToProps = state => {
  return { username: state.user.username };
}

export default connect(mapStateToProps, { onRoomDelete, onRoomLeave })(RoomItem);