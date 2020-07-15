import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Rooms from './Rooms';
import Chat from './Chat';
import EmptyScreen from './EmptyScreen';
import RoomsListHeader from './Header';
import { onMessagesValueChange } from '../actions';

const MainScreen = props => {
  const [room, setRoom] = useState(null);

  const { windowHeight, onMessagesValueChange } = props;

  const onRoomSelect = room => {
    onMessagesValueChange({ messages: [] });
    setRoom(room);
  }

  return (
    <React.Fragment>
      <RoomsListHeader />
      <Row>
        <Col span={7}>
          <Rooms windowHeight={windowHeight} onRoomPress={onRoomSelect} />
        </Col>
        <Col span={17} style={{ paddingLeft: 15 }}>
          {room ? <Chat room={room} windowHeight={windowHeight} onBack={() => setRoom(null)} /> : <EmptyScreen description="No room selected" />}
        </Col>
      </Row>
    </React.Fragment>
  )
}

MainScreen.propTypes = {
  windowHeight: PropTypes.number,
  onMessagesValueChange: PropTypes.func.isRequired
}

export default connect(null, { onMessagesValueChange })(MainScreen);