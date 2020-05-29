import React from 'react';
import { Input, Row, Col, Button, Tooltip } from 'antd';

class MessageInput extends React.Component {
  render() {
    return (
      <Row>
        <Col span={20}>
          <Input.TextArea autoSize />
        </Col>
        <Col span={4} className='send-button-container'>
          <Tooltip title='Send Message'>
            <Button type="primary" className='send-button'>Send</Button>
          </Tooltip>
        </Col>
      </Row>
    )
  }
}

export default MessageInput;