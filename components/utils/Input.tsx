import React from 'react';

const Input = ({ text, name, placeholder, type, required, min, max }) => (
  <label
    htmlFor={name}
    className='my-4 px-1 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 w-full'
  >
    <span>{text}</span>
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      min={min || ''}
      max={max || ''}
      required={required}
      autoComplete='off'
      className='py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer'
    />
  </label>
);

export default Input;
