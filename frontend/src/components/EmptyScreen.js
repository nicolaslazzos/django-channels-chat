import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Card } from 'antd';

const EmptyScreen = props => {
  return (
    <Card className='empty-screen-container' style={props.containerStyle}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={props.description} />
    </Card>
  )
}

EmptyScreen.propTypes = {
  description: PropTypes.string,
  containerStyle: PropTypes.object
}

export default EmptyScreen;