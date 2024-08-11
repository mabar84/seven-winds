import { toast } from 'react-toastify';

export const errorNotification: typeof toast.error = (...args) => {
  return toast.error(...args);
};

export const successNotification: typeof toast.success = (...args) => {
  return toast.success(...args);
};

export const infoNotification: typeof toast.info = (...args) => {
  return toast.info(...args);
};
