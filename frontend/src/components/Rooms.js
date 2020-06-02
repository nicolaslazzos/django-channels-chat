import React from 'react';
import { List, Spin, Tooltip, PageHeader, Button } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import NewRoomModal from './NewRoomModal';
import { onUserLogout } from '../actions';

const windowPadding = 189;

class Rooms extends React.Component {
  state = {
    data: [
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
      { name: 'private', label: 'Private Chat Room' },
    ],
    loading: false,
    hasMore: true,
    newRoomVisible: false,
  };

  onNewRoomToggle = () => this.setState({ newRoomVisible: !this.state.newRoomVisible })

  handleInfiniteOnLoad = () => {
    let { data } = this.state;

    this.setState({ loading: true, });

    if (data.length > 9) this.setState({ hasMore: false, loading: false });
  };

  render() {
    return (
      <div>
        <PageHeader
          className="chat-header"
          title="Rooms"
          extra={[
            <Tooltip title="New Room">
              <Button type="link" onClick={this.onNewRoomToggle} icon={<PlusOutlined />} />
            </Tooltip>,
            <Tooltip title="Log Out">
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
            <List
              className="rooms-list"
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item>
                  <a onClick={this.props.onRoomPress}>
                    <List.Item.Meta
                      title={item.label}
                      description={`@${item.name}`}
                      style={{ alignItems: 'flex-start' }}
                    />
                  </a>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div >

        <NewRoomModal visible={this.state.newRoomVisible} onCancel={this.onNewRoomToggle} />
      </div>
    );
  }
}

export default connect(null, { onUserLogout })(Rooms);