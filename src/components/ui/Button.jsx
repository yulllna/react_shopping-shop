import React from 'react';

function Button({ icon, text, onClick }) {
  return (
    <li className='flex items-center mr-3 cursor-pointer hover:brightness-110' onClick={onClick}>
      {icon}
      <span className='ml-1'>{text}</span>
    </li>
  );
}

export default Button;