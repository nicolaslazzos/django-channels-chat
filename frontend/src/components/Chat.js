import React from 'react';
import { List, Spin, Comment, Tooltip } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

const windowPadding = 237;

class Chat extends React.Component {
  state = {
    data: [
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
      { username: 'nicolaslazzos', message: 'Hi, how are you?' },
    ],
    loading: false,
    hasMore: true,
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;

    this.setState({ loading: true });

    if (data.length > 14) this.setState({ hasMore: false, loading: false, });
  };

  render() {
    return (
        <div className='infinite-container chat-infinite-container' style={{ height: this.props.windowHeight - windowPadding }}>
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
                <Comment
                  author={`@${item.username}`}
                  content={<p style={{ textAlign: 'left' }}>{item.message}</p>}
                  datetime={
                    <Tooltip title={moment().format('LLLL')}>
                      <span>{moment().format('dddd, MMM DD [at] HH:mm')}</span>
                    </Tooltip>
                  }
                  style={{ paddingBottom: 0 }}
                />
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
    );
  }
}

export default Chat;