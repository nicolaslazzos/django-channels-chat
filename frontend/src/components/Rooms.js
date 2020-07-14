import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Tooltip, PageHeader, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import NewRoomModal from './NewRoomModal';
import RoomItem from './RoomItem';
import { onUserLogout, onRoomsRead, onRoomsValueChange } from '../actions';

const windowPadding = 189;

const Rooms = props => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const { rooms, username, newRoomVisible, windowHeight, onRoomsRead, onUserLogout, onRoomsValueChange } = props;

  useEffect(() => { onRoomsRead() }, [onRoomsRead]);

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    rooms.length > 9 && setLoading(false) && setHasMore(false);
  };

  const toggleNewRoom = () => onRoomsValueChange({ newRoomVisible: !newRoomVisible });

  const roomsListRender = rooms => {
    return (
      <List
        className="rooms-list"
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={room => <RoomItem room={room} />}
      />
    );
  }

  return (
    <div>
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
      <div className="infinite-container rooms-infinite-container" style={{ height: windowHeight - windowPadding }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <Divider orientation="left">Own</Divider>
          {roomsListRender(rooms.filter(room => room.owner === username))}
          <Divider orientation="left">Joined</Divider>
          {roomsListRender(rooms.filter(room => room.owner !== username))}
        </InfiniteScroll>
      </div >
      <NewRoomModal visible={newRoomVisible} onCancel={toggleNewRoom} />
    </div>
  );
}

Rooms.propTypes = {
  rooms: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  newRoomVisible: PropTypes.bool.isRequired,
  onUserLogout: PropTypes.func.isRequired,
  onRoomsRead: PropTypes.func.isRequired,
  onRoomsValueChange: PropTypes.func.isRequired,
  windowHeight: PropTypes.number
}

const mapStateToProps = state => {
  const { username } = state.user;
  const { rooms, newRoomVisible } = state.rooms;
  return { username, rooms, newRoomVisible };
}

export default connect(mapStateToProps, { onUserLogout, onRoomsRead, onRoomsValueChange })(Rooms);