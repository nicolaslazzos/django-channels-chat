import React from 'react';
import { Modal, Button, Tooltip, Input, Card } from 'antd';
import { UserOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons';

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
  state = {
    selectedTab: 'join',
    tabsContent: {
      join: (
        <div>
          <Input placeholder="room name" prefix={<UserOutlined />} />
          <br />
          <br />
          <Input.Password placeholder="password" prefix={<KeyOutlined />} />
          <br />
          <br />
          <Tooltip title='Join Room'>
            <Button type="primary">Join Room</Button>
          </Tooltip>
        </div>
      ),
      create: (
        <div>
          <Input placeholder="room name" prefix={<UserOutlined />} />
          <br />
          <br />
          <Input placeholder="room label" prefix={<HomeOutlined />} />
          <br />
          <br />
          <Input.Password placeholder="password" prefix={<KeyOutlined />} />
          <br />
          <br />
          <Input.Password placeholder="confirm password" prefix={<KeyOutlined />} />
          <br />
          <br />
          <Tooltip title='Create Room'>
            <Button type="primary">Create Room</Button>
          </Tooltip>
        </div>
      ),
    }
  };

  onTabChange = key => this.setState({ selectedTab: key });

  render() {
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
            {this.state.tabsContent[this.state.selectedTab]}
          </Card>
        </Modal>
      </div>
    );
  }
}

export default NewRoomModal;