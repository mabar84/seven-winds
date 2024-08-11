import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const withToastifyProvider = (Component: FC) => () => {
  return (
    <>
      <Component />
      <ToastContainer position="bottom-left" theme="dark" />
    </>
  );
};
