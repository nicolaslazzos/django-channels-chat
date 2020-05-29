import React from 'react';
import { Empty, Card } from 'antd';

const EmptyScreen = () => {
  return (
    <Card className='empty-screen-container'>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Room Selected" />
    </Card>
  )
}

export default EmptyScreen;