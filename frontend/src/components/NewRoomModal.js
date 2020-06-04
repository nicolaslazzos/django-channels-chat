import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Tooltip, Input, Card } from 'antd';
import { UserOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons';
import { onRoomCreate, onRoomsValueChange, onRoomJoin } from '../actions';

const tabsList = [
  {
    key: 'join',
    tab: 'Join',
  },
  {
    key: 'create',
    tab: 'Create',
  },
];

class NewRoomModal extends React.Component {
  state = { selectedTab: 'join' };

  joinRoomFormRender = () => {
    return (
      <div>
        <Input
          placeholder="room name"
          value={this.props.id}
          onChange={event => this.props.onRoomsValueChange({ id: event.target.value })}
          prefix={<UserOutlined />}
        />
        <br />
        <br />
        <Input.Password
          placeholder="password"
          value={this.props.password}
          onChange={event => this.props.onRoomsValueChange({ password: event.target.value })}
          prefix={<KeyOutlined />}
        />
        <br />
        <br />
        <Tooltip title='Join Room'>
          <Button type="primary" onClick={this.onJoinRoomClick}>Join Room</Button>
        </Tooltip>
      </div>
    );
  }

  onJoinRoomClick = () => {
    if (this.props.password) this.props.onRoomJoin({ room: this.props.id, user: this.props.username, password: this.props.password });
  }

  newRoomFormRender = () => {
    return (
      <div>
        <Input
          placeholder="room name"
          value={this.props.id}
          onChange={event => this.props.onRoomsValueChange({ id: event.target.value })}
          prefix={<UserOutlined />}
        />
        <br />
        <br />
        <Input
          placeholder="room label"
          value={this.props.label}
          onChange={event => this.props.onRoomsValueChange({ label: event.target.value })}
          prefix={<HomeOutlined />}
        />
        <br />
        <br />
        <Input.Password
          placeholder="password"
          value={this.props.password}
          onChange={event => this.props.onRoomsValueChange({ password: event.target.value })}
          prefix={<KeyOutlined />}
        />
        <br />
        <br />
        <Input.Password
          placeholder="confirm password"
          value={this.props.confirmPassword}
          onChange={event => this.props.onRoomsValueChange({ confirmPassword: event.target.value })}
          prefix={<KeyOutlined />}
        />
        <br />
        <br />
        <Tooltip title='Create Room'>
          <Button type="primary" onClick={this.onCreateRoomClick} loading={this.props.loading}>Create Room</Button>
        </Tooltip>
      </div>
    );
  }

  onCreateRoomClick = () => {
    if (this.props.password === this.props.confirmPassword) {
      this.props.onRoomCreate({
        id: this.props.id,
        label: this.props.label,
        password: this.props.password,
      })
    }
  }

  onTabChange = key => this.setState({ selectedTab: key });

  render() {
    const tabsContent = { join: this.joinRoomFormRender, create: this.newRoomFormRender };

    return (
      <div>
        <Modal
          title="New Room"
          visible={this.props.visible}
          footer={null}
          onCancel={this.props.onCancel}
          bodyStyle={{ padding: 0 }}
        >
          <Card
            tabList={tabsList}
            style={{ width: '100%', borderWidth: 0 }}
            activeTabKey={this.state.selectedTab}
            onTabChange={this.onTabChange}
          >
            {tabsContent[this.state.selectedTab]()}
          </Card>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username } = state.user;
  const { id, label, password, confirmPassword, loading } = state.rooms;
  return { id, label, password, confirmPassword, loading, username };
}

export default connect(mapStateToProps, { onRoomCreate, onRoomsValueChange, onRoomJoin })(NewRoomModal);