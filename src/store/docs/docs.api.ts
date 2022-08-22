import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_URL} from 'constants/constants';
import {IDoc} from 'types/docs';

export const docsApi = createApi({
  reducerPath: 'docs/api',
  baseQuery: fetchBaseQuery({baseUrl: SERVER_URL}),
  endpoints: builder => ({
    getDocsItem: builder.query<IDoc[], string>({
      query: id => `total/${id}`,
    }),
    updateDoc: builder.mutation<IDoc, Partial<IDoc> & Pick<IDoc, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `total/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
  }),
});

export const {useLazyGetDocsItemQuery} = docsApi;