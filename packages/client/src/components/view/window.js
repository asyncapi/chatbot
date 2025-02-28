/* eslint-disable import/no-extraneous-dependencies */
import {
  useEffect, useState, useReducer, lazy, Suspense,
} from 'react';
import PropTypes from 'prop-types';
import BackArrow from '../illustrations/backArrow';
import Cancel from '../illustrations/cancel';
import Messages from '../chat/messages';
import socketConnection from '../../utils/socketConnection';
import messageReducer from '../../store/reducers/messages';
import { onMessageExchange } from '../../store/actions/message';
import info from '../../config/info.json';

const initialState = {
  messages: [],
  sending: false,
  error: null,
};

const TextInput = lazy(() => import('../inputs/text'));
const SelectInput = lazy(() => import('../inputs/select'));

function Window({ setView, setShow, view }) {
  // eslint-disable-next-line no-unused-vars
  const [messages, dispatch] = useReducer(messageReducer, initialState);
  const [socket, setSocket] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // eslint-disable-next-line no-shadow
  const onMessageHandler = (message, socket) => {
    onMessageExchange({
      type: message.type,
      text: message.text,
    }, dispatch, socket);
  };
  useEffect(() => {
    setSocket(socketConnection);
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setSocketConnected(socket.connected);
        socket.emit('signIn', view);
        socket.on('bot-message', (data) => {
          onMessageHandler({
            type: 'bot',
            text: data,
          });
        });
        socket.on('message', (data) => {
          onMessageHandler(
            {
              type: 'bot',
              text: data,
            },
          );
        });
      });
      socket.on('disconnect', () => {
        setSocketConnected(socket.disconnected);
      });
    }
  }, [socket]);
  useEffect(() => {
  }, [socketConnected]);
  useEffect(() => {
  }, messages);
  const latestMessageHolder = messages.messages[messages.messages.length - 1];
  let defaultInputType;
  // eslint-disable-next-line max-len
  if (latestMessageHolder && Object.keys(latestMessageHolder.text)) {
    if (latestMessageHolder.text.type === 'boolean' || latestMessageHolder.text.type === 'array') {
      defaultInputType = (
        <SelectInput
          message={latestMessageHolder.text}
          onMessageHandler={onMessageHandler}
          socket={socket}
        />
      );
    } else {
      defaultInputType = <TextInput onMessageHandler={onMessageHandler} socket={socket} />;
    }
  }
  return (
    <div className="shadow-2xl w-100 h-full rounded-lg">
      <div className="bg-900 h-10v p-5 rounded-t-lg flex flex-col items-center justify-center ">
        <div className="flex justify-between w-100">
          <div className="flex justify-between">
            <button
              onClick={() => {
                setView(null);
              }}
            >
              <BackArrow className="cursor-pointer" />
            </button>
            <div className="pl-5 flex items-center text-white">
              <img
                src={info.avatar}
                alt={info.name}
                className="rounded-full h-8 w-8"
              />
              <p className="pl-5">{info.name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShow(null);
            }}
          >
            <Cancel className="cursor-pointer" />
          </button>
        </div>
      </div>
      <Messages messages={messages} />
      {!messages.sending ? (
        <Suspense fallback={<div></div>}>{defaultInputType}</Suspense>
      ) : (
        <div className="flex justify-center">
          <svg
            version="1.1"
            id="L5"
            x="0px"
            y="0px"
            width="50px"
            height="50px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
          >
            <circle fill="#14242f" stroke="none" cx="6" cy="50" r="6">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 15 ; 0 -15; 0 15"
                repeatCount="indefinite"
                begin="0.1"
              />
            </circle>
            <circle fill="#14242f" stroke="none" cx="30" cy="50" r="6">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 10 ; 0 -10; 0 10"
                repeatCount="indefinite"
                begin="0.2"
              />
            </circle>
            <circle fill="#14242f" stroke="none" cx="54" cy="50" r="6">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.3"
              />
            </circle>
          </svg>
        </div>
      )}
    </div>
  );
}

Window.propTypes = {
  setView: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};
export default Window;
