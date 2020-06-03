import React, { useState } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Rooms from './Rooms';
import Chat from './Chat';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';

const MainScreen = props => {
  const [room, setRoom] = useState(false);

  const onRoomSelect = room => setRoom(room);

  return (
    <Row>
      <Col span={7}>
        <Rooms windowHeight={props.windowHeight} onRoomPress={onRoomSelect} />
      </Col>
      <Col span={17} style={{ paddingLeft: 15 }}>
        {room ? (
          <div>
            <PageHeader
              className="chat-header"
              onBack={() => setRoom(null)}
              title={room.label}
              subTitle={`@${room.id}`}
            />
            <Chat windowHeight={props.windowHeight} />
            <MessageInput />
          </div>
        ) : <EmptyScreen />}
      </Col>
    </Row>
  )
}

export default MainScreen;