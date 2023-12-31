import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'https://mern-crud-backend-psi.vercel.app',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://mern-crud-backend-psi.vercel.app',
        'Access-Control-Allow-Credentials': true
    }
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({}),
});
