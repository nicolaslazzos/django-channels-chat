import React from 'react';
import { List, Spin, Comment, Tooltip } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

const windowPadding = 237;

class Chat extends React.Component {
  state = { loading: false, hasMore: true };

  handleInfiniteOnLoad = () => {
    const { messages } = this.props;

    this.setState({ loading: true });

    if (messages.length > 14) this.setState({ hasMore: false, loading: false, });
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
            dataSource={this.props.messages}
            renderItem={item => (
              <Comment
                key={item.id.toString()}
                author={`@${item.author}`}
                content={<p style={{ textAlign: 'left' }}>{item.text}</p>}
                datetime={
                  <Tooltip title={moment(item.sent).format('LLLL')}>
                    <span>{moment(item.sent).format('dddd, MMM DD [at] HH:mm')}</span>
                  </Tooltip>
                }
                style={{ paddingBottom: 0 }}
              />
            )}
          >
            {(this.props.loading || (this.state.loading && this.state.hasMore)) && (
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

const mapStateToProps = state => {
  const { messages, loading } = state.messages;
  return { messages, loading };
}

export default connect(mapStateToProps, null)(Chat);