/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

function Select({ message, onMessageHandler, socket }) {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (message.type === 'boolean') {
      setOptions(['Yes', 'No']);
    } else {
      setOptions(message.items);
    }
  }, []);
  useEffect(() => {
    if (selected) {
      onMessageHandler(
        {
          type: 'user',
          text: selected,
        },
        socket,
      );
      setSelected(null);
    }
  }, [selected]);
  return (
    <div className="flex justify-center wrap">
      {options.map((item) => (
          <div key={item} className="bg-lightGray ml-2 min-w-20 rounded-lg p-2 text-sm cursor-pointer" onClick={() => {
            setSelected(item);
          }}>
            {item}
          </div>
      ))}
    </div>
  );
}

export default Select;
