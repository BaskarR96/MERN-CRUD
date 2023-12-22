import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => `${USERS_URL}`
        }),
        getUser: builder.query({
            query: (id) => `${USERS_URL}/${id}`
        }),
        updateUser: builder.mutation({
            query: ({ userId, updatedData }) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'PUT',
                body: updatedData,
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSlice