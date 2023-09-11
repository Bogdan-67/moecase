import { API_URL } from '@/http';
import { IStock } from '@/models/IStock';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stockApi = createApi({
  reducerPath: 'api/stock',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getStock: build.query<IStock, number>({ query: (id) => `drop/${id}` }),
    createStock: build.mutation({
      query: (data) => ({
        url: `drop`,
        method: 'POST',
        body: data,
        formData: true,
      }),
    }),
    editStock: build.mutation<IStock, Partial<IStock>>({
      query(body) {
        return {
          url: `posts`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const { useGetStockQuery, useCreateStockMutation, useEditStockMutation } = stockApi;
