import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Card } from 'antd';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

const NewRoomModal = props => {
  const [selectedTab, setSelectedTab] = useState('join');

  const tabsList = [{ key: 'join', tab: 'Join', }, { key: 'create', tab: 'Create', }];
  const tabs = { join: <JoinRoomForm />, create: <CreateRoomForm /> };

  const { visible, onCancel } = props;

  return (
    <div>
      <Modal
        title="New Room"
        visible={visible}
        footer={null}
        onCancel={onCancel}
        bodyStyle={{ padding: 0 }}
      >
        <Card
          tabList={tabsList}
          style={{ width: '100%', borderWidth: 0 }}
          activeTabKey={selectedTab}
          onTabChange={setSelectedTab}
        >
          {tabs[selectedTab]}
        </Card>
      </Modal>
    </div>
  );
}

NewRoomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
}

export default NewRoomModal;