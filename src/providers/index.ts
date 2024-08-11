import { FC } from 'react';

import { compose } from '@reduxjs/toolkit';

import { withReduxProvider } from './withReduxProvider';
import {withToastifyProvider} from "./withToastifyProvider.tsx";

export const withProviders: (Component: FC) => FC = compose(
  withReduxProvider,
  withToastifyProvider
);
