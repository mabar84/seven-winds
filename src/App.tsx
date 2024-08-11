import React from "react";
import {router} from "./router/router";
import {RouterProvider} from 'react-router-dom';

export const App = () => {
    return <RouterProvider router={router}/>;
};
