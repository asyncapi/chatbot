/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */
import {
  useState, useEffect, lazy, Suspense,
} from 'react';
import PropTypes from 'prop-types';
import Divider from '../illustrations/divider';
import info from '../../config/info.json';

const ChatWindow = lazy(() => import('./window'));

function Default({ setShow }) {
  const [view, setView] = useState(null);
  useEffect(() => {
  }, [view]);
  if (view === 'generate') {
    return <Suspense fallback={<div>loading</div>}>
      <ChatWindow setView={setView} view={view} setShow={setShow} />
    </Suspense>;
  }
  return (
    <div className="bg-primary rounded-lg w-100 h-full flex text-white p-4 flex-col items-center justify-center">
      <img
        src={info.avatar}
        alt={info.name}
        className="rounded-full h-14 w-14"
      />
      <div className="mt-2 font-bold">
        <h6>Hi !</h6>
        <p>I'm  {info.name}</p>
      </div>
      <p className="text-sm mt-2">Select what your interest is</p>
      <Divider className="mt-2 fill-current" />
      <div className="flex flex-col content-center justify-center text-black mt-2 text-sm">
        <button
          className="bg-white rounded-full p-2 px-4"
          onClick={() => setView('generate')}
        >
          Generate Specification
        </button>
      </div>
      <Divider className="mt-2 fill-current" />
    </div>
  );
}
Default.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default Default;
