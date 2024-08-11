import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {ID} from "../constants/entityId";
import {TreeResponse} from "./types";


export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://185.244.172.108:8081/',
    }),
    endpoints: builder => {
        return {
            getTreeRows: builder.query<TreeResponse, void>({
                query: () => `/v1/outlay-rows/entity/${ID}/row/list`,
            }),
            createRow: builder.mutation({
                query: (body) => {
                    return {
                        body,
                        method: 'POST',
                        url: `/v1/outlay-rows/entity/${ID}/row/create`,
                    }
                }
            }),
            deleteRow: builder.mutation({
                query: (rID) => {
                    return {
                        method: 'DELETE',
                        url: `/v1/outlay-rows/entity/${ID}/row/${rID}/delete`,
                    }
                }
            })
        };
    },
    reducerPath: 'baseApi',
});

export const {useGetTreeRowsQuery, useCreateRowMutation, useDeleteRowMutation} = baseApi;
