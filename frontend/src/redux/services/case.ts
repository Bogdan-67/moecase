import { API_URL } from '@/http';
import { ICase } from '@/models/ICase';
import { IGroup } from '@/models/IGroup';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const caseApi = createApi({
  reducerPath: 'api/cases',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getAllCases: build.query<ICase[], void>({ query: () => 'cases' }),
    getCasesByGroup: build.query<ICase[], number>({
      query: (id_group) => `cases?group_id=${id_group}`,
    }),
    getCaseGroups: build.query<IGroup[], void>({ query: () => 'case-groups' }),
    createCase: build.mutation({
      query: (data) => ({
        url: `case`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCasesQuery,
  useGetCasesByGroupQuery,
  useGetCaseGroupsQuery,
  useCreateCaseMutation,
} = caseApi;
