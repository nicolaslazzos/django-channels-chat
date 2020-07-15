import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, Button, Tooltip } from 'antd';

const MessageInput = props => {
  const { message, onChange, onSendClick } = props;

  return (
    <Row>
      <Col span={20}>
        <Input.TextArea value={message} onChange={onChange} autoSize />
      </Col>
      <Col span={4} className='send-button-container'>
        <Tooltip title='Send Message'>
          <Button type="primary" className='send-button' onClick={onSendClick}>Send</Button>
        </Tooltip>
      </Col>
    </Row>
  );
}

MessageInput.propTypes = {
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSendClick: PropTypes.func
}

export default MessageInput;