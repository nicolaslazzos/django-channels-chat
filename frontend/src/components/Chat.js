import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, PageHeader, Spin } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Message from './Message';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import Spinner from './Spinner';
import { onRoomMessagesRead } from '../actions';

const windowPadding = 325;

const Chat = props => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [message, setMessage] = useState('');
  const [roomSocket, setRoomSocket] = useState(null);

  const { room, messages: { messages, loading: loadingChat }, username, windowHeight, onBack, onRoomMessagesRead } = props;

  useEffect(() => {
    roomSocket && roomSocket.close();
    setRoomSocket(onRoomMessagesRead(room.id));
  }, [room]);

  const onMessageSend = () => {
    if (roomSocket) {
      roomSocket.send(JSON.stringify({ command: 'new_message', data: { text: message, author: username } }));
      setMessage('');
    }
  }

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    messages.length > 14 && setLoading(false) && setHasMore(false);
  };

  const renderList = () => {
    if (loadingChat) return <Spinner />;

    if (!messages.length) return <EmptyScreen description='There are no messages' containerStyle={{ borderWidth: 0 }} />;

    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={message => <Message key={message.id.toString()} message={message} />}
        >
          {loading && hasMore && <div className="loading-container"><Spin /></div>}
        </List>
      </InfiniteScroll>
    );
  }

  return (
    <React.Fragment>
      <PageHeader
        className="chat-header"
        onBack={onBack}
        title={room.label}
        subTitle={`@${room.id}`}
      />
      <div className='infinite-container chat-infinite-container' style={{ height: windowHeight - windowPadding }}>
        {renderList()}
      </div >
      <MessageInput message={message} onChange={e => setMessage(e.target.value)} onSendClick={onMessageSend} />
    </React.Fragment>
  );
}

Chat.propTypes = {
  room: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  windowHeight: PropTypes.number,
  onBack: PropTypes.func,
  onRoomMessagesRead: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { messages } = state;
  const { username } = state.user;
  return { username, messages };
}

export default connect(mapStateToProps, { onRoomMessagesRead })(Chat);