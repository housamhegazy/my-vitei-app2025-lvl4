import { Outlet } from 'react-router';
import React from 'react';

const Root = () => {
  return (
    <div>
      <h1>header</h1>
        <Outlet />
      <h1>footer</h1>
    </div>
  );
}

export default Root;
