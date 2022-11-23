/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import info from '../../config/info.json';

function Messages({ messages }) {
  useEffect(() => {
  }, []);
  return (
    <div className="w-100 h-78v p-5 overflow-y-auto flex flex-col items-start">
      {Object.keys(messages).length
        && messages.messages.map((chat, i) => (
          <div key={i} className="pt-5 w-100">
            <div
              className={`flex items-end w-full ${
                chat.type !== 'bot' && 'items-end justify-end'
              }`}
            >
              {chat.type === 'bot' && (
                <div>
                  {' '}
                  <img
                    src={info.avatar}
                    alt={info.name}
                    className="rounded-full h-6 w-6"
                  />
                </div>
              )}
              <div
                className={`p-4 ml-1 rounded-md break-words text-left ${
                  chat.type === 'bot'
                    ? 'bg-lightGray text-left'
                    : 'bg-darkGray text-white'
                }`}
                style={{
                  maxWidth: '90%',
                }}
              >
                {chat.text.value ? chat.text.value : chat.text}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Messages;
