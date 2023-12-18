import React from 'react';

const DropDownItems = ({ icon, text }) => {
  return (
    <div className="w-48">
      <li className="relative flex items-center font-medium my-1 gap-2">
        {icon}

        <span>{text}</span>
      </li>
    </div>
  );
};

export default DropDownItems;
