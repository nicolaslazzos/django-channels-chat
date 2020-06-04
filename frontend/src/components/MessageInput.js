import React from 'react';
import { Input, Row, Col, Button, Tooltip } from 'antd';

class MessageInput extends React.Component {
  state = { message: '' }

  onSendClick = () => {
    if (this.state.message) {
      this.props.onMessageSend(this.state.message);
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <Row>
        <Col span={20}>
          <Input.TextArea value={this.state.message} onChange={event => this.setState({ message: event.target.value })} autoSize />
        </Col>
        <Col span={4} className='send-button-container'>
          <Tooltip title='Send Message'>
            <Button type="primary" className='send-button' onClick={this.onSendClick}>Send</Button>
          </Tooltip>
        </Col>
      </Row>
    )
  }
}

export default MessageInput;