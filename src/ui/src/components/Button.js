import * as React from 'react';

export default ({ children, className, ...others }) => {
  return (
    <button
      className={`p-2 border-gray-100 border rounded text-sm bg-blue-100 hover:bg-blue-200 ${className}`}
      {...others}
    >
      {children}
    </button>
  );
};
