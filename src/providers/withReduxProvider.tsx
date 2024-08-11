import { FC } from 'react';
import { Provider } from 'react-redux';
import {store} from "../services/store";


export const withReduxProvider = (Component: FC) => () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
