import { useState } from 'react';
import Default from '../view/default';

function Modal() {
  const [show, setShow] = useState(false);
  return (
    <div
      className="fixed md:bottom-5 right-0 w-full md:w-2/4 flex justify-end"
    >
      {show ? (
        <div
          className="w-full md:mr-10 text-center sm:block sm:p-0"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="rounded-lg h-100v pt-10 w-full">
            <Default setShow={setShow} />
          </div>
        </div>
      ) : (
        <div
          className="rounded-full bg-blue-400 md:mr-10 h-12 w-12 bg-huey bg-cover bg-center cursor-pointer"
          onClick={() => setShow(true)}
        >
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Modal;
