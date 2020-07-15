import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import RoomItem from './RoomItem';
import { onRoomsRead } from '../actions';

const windowPadding = 189;

const Rooms = props => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const { rooms, username, windowHeight, onRoomsRead, onRoomPress } = props;

  useEffect(() => { onRoomsRead() }, [onRoomsRead]);

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    rooms.length > 9 && setLoading(false) && setHasMore(false);
  };

  const roomsListRender = rooms => {
    return (
      <List
        className="rooms-list"
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={room => <RoomItem key={room.id} room={room} onClick={() => onRoomPress(room)} />}
      />
    );
  }

  return (
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
  );
}

Rooms.propTypes = {
  rooms: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  onRoomsRead: PropTypes.func.isRequired,
  windowHeight: PropTypes.number,
  onRoomPress: PropTypes.func
}

const mapStateToProps = state => {
  const { username } = state.user;
  const { rooms } = state.rooms;
  return { username, rooms };
}

export default connect(mapStateToProps, { onRoomsRead })(Rooms);