import React from 'react';
import { List, message, Avatar, Spin, Comment, Tooltip } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Chat extends React.Component {
  state = {
    data: [
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
      { username: 'Nico', message: 'Hola como andas??' },
    ],
    loading: false,
    hasMore: true,
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
  };

  renderMessages = () => {
    for (let i = 0; i < 10; i++) {
      return (
        <Comment
          author={<a>Han Solo</a>}
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure), to help people create their product prototypes beautifully
              and efficiently.
        </p>
          }
          datetime={
            <Tooltip title={(new Date()).toString()}>
              <span>{(new Date()).toString()}</span>
            </Tooltip>
          }
        />
      )
    }
  }

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
              <li>
                <Comment
                  author={<a>{item.username}</a>}
                  content={<p style={{textAlign: 'left'}}>{item.message}</p>}
                  datetime={
                    <Tooltip title={(new Date()).toString()}>
                      <span>{(new Date()).toString()}</span>
                    </Tooltip>
                  }
                />
              </li>
            )}
          >
          {/* <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          > */}
          {this.state.loading && this.state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
          </List>
        </InfiniteScroll>
      </div >
    );
  }
}

export default Chat;