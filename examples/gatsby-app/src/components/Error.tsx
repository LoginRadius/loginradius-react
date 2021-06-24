import React from 'react';

export interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      Oops... {message}
    </div>
  );
};

export default Error;
