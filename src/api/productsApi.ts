import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProductsResponse } from '../interfaces/ApiResponse/IProductsResponse';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getMainProducts: builder.query<IProductsResponse, void>({
      query: () => 'products?on_main=true',
    }),
    getPagedProducts: builder.query<IProductsResponse, number>({
      query: (page) => `products?on_main=false&per_page=100&page=${page}`,
    }),
  }),
});

export const { useGetMainProductsQuery, useGetPagedProductsQuery } = productsApi;