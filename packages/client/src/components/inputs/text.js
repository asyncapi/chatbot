/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import PropTypes from 'prop-types';
import SendArrow from '../illustrations/sendArrow';

function Text({ onMessageHandler, socket }) {
  const [message, setMessage] = useState(null);
  return (
    <div
      className="flex justify-between items-center p-3.5 border-200 border-t"
      style={{
        height: '7vh',
      }}
    >
      <div className="w-90">
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a reply..."
          className="bg-transparent w-100 focus:outline-none"
          value={message}
        />
      </div>
      <button
        onClick={() => {
          if (message) {
            onMessageHandler(
              {
                type: 'user',
                text: message,
              },
              socket,
            );
            setMessage('');
          }
        }}
      >
        <SendArrow className="fill-current" />
      </button>
    </div>
  );
}

Text.propTypes = {
  onMessageHandler: PropTypes.func.isRequired,
  socket: PropTypes.func.isRequired,
};

export default Text;
