
import React from 'react';

const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
};

export default Label;
