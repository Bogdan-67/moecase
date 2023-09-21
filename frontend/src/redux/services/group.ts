import { API_URL } from '@/http';
import { IGroup } from '@/models/IGroup';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'api/group',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getGroups: build.query<IGroup[], void>({ query: () => `case-groups` }),
    createGroup: build.mutation({
      query: (data) => ({
        url: `case-group`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupsQuery } = groupApi;
