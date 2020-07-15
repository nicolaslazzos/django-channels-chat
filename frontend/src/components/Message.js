import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

const Message = props => {
  const { message: { author, sent, text } } = props;

  return (
    <Comment
      style={{ paddingBottom: 0 }}
      author={`@${author}`}
      content={<p style={{ textAlign: 'left' }}>{text}</p>}
      datetime={
        <Tooltip title={moment(sent).format('LLLL')}>
          <span>{moment(sent).format('dddd, MMM DD [at] HH:mm')}</span>
        </Tooltip>
      }
    />
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired
}

export default Message;