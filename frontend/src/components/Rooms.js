import React from 'react';
import { List, Spin, Tooltip, PageHeader, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import NewRoomModal from './NewRoomModal';
import { onUserLogout, onRoomsRead, onRoomsValueChange, onRoomDelete, onRoomLeave } from '../actions';

const windowPadding = 189;

class Rooms extends React.Component {
  state = { loading: false, hasMore: true, };

  componentDidMount() {
    this.props.onRoomsRead();
  }

  onNewRoomToggle = () => this.props.onRoomsValueChange({ newRoomVisible: !this.props.newRoomVisible });

  handleInfiniteOnLoad = () => {
    let { rooms } = this.props;

    this.setState({ loading: true });

    if (rooms.length > 9) this.setState({ hasMore: false, loading: false });
  };

  renderLeaveButton = id => {
    return <a key="room-leave" onClick={() => this.props.onRoomLeave(id)}>leave</a>;
  }

  renderDeleteButton = id => {
    return <a key="room-delete" onClick={() => this.props.onRoomDelete(id)}>delete</a>;
  }

  roomsListRender = rooms => {
    return (
      <List
        className="rooms-list"
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[item.owner === this.props.username ? this.renderDeleteButton(item.id) : this.renderLeaveButton(item.id)]}
          >
            <a onClick={() => this.props.onRoomPress(item)}>
              <List.Item.Meta
                title={item.label}
                description={`@${item.id}`}
                style={{ alignItems: 'flex-start' }}
              />
            </a>
          </List.Item>
        )}
      />
    );
  }

  render() {
    return (
      <div>
        <PageHeader
          className="chat-header"
          title={`@${this.props.username}`}
          extra={[
            <Tooltip title="New Room" key='new-room'>
              <Button type="link" onClick={this.onNewRoomToggle} icon={<PlusOutlined />} />
            </Tooltip>,
            <Tooltip title="Log Out" key='log-out'>
              <Button type="link" onClick={this.props.onUserLogout} icon={<LogoutOutlined />} />
            </Tooltip>,
          ]}
        />
        <div className="infinite-container rooms-infinite-container" style={{ height: this.props.windowHeight - windowPadding }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <Divider orientation="left">Own</Divider>
            {this.roomsListRender(this.props.rooms.filter(room => room.owner === this.props.username))}
            <Divider orientation="left">Joined</Divider>
            {this.roomsListRender(this.props.rooms.filter(room => room.owner !== this.props.username))}
          </InfiniteScroll>
        </div >
        <NewRoomModal visible={this.props.newRoomVisible} onCancel={this.onNewRoomToggle} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username } = state.user;
  const { rooms, newRoomVisible } = state.rooms;
  return { username, rooms, newRoomVisible };
}

export default connect(mapStateToProps, { onUserLogout, onRoomsRead, onRoomsValueChange, onRoomDelete, onRoomLeave })(Rooms);