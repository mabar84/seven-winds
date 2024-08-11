import {createBrowserRouter, Navigate, RouteObject} from 'react-router-dom';

import {Smr} from "../pages/smr/Smr.tsx";
import {Routes} from "../constants/routes.ts";
import {Page404} from "../pages/page404";
import {Layout} from "../layout";

const privateRoutes: RouteObject[] = [
    {},
];

const publicRoutes: RouteObject[] = [
    {
        children: [
            {element: <Navigate to={Routes.SMR} replace/>, path: '/'},
            {element: <Smr/>, path: Routes.SMR},
            {element: <Page404/>, errorElement: <Page404/>, path: '*'},
        ],
        element: <Layout/>,
        path: '/',
    },
];

export const router = createBrowserRouter([
        {
            children: privateRoutes,
            element: <Page404/>
        },
        ...publicRoutes,
    ])
;
