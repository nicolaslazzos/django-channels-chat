import React from 'react';
import PropTypes from 'prop-types';
import { Card, Spin } from 'antd';

const Spinner = props => {
  return (
    <Card className='empty-screen-container' style={{ borderWidth: 0, ...props.containerStyle }}>
      <Spin />
    </Card>
  )
}

Spinner.propTypes = {
  containerStyle: PropTypes.object
}

export default Spinner;