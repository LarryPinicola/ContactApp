import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://contact-app.mmsdev.site/api/v1` }),
    tagTypes: ['contact'], 
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => '/contact',
            providesTags: ['contact'],
        }),
        getRegister: builder.mutation({
            query: (user) => ({
                url: `/register`,
                method: `POST`,
                body: user,
            }),
            invalidatesTags: [`contact`],
        }),
        getLogin: builder.mutation({
            query: (user) => ({
                url: `/login`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['contact'],
        }),
        getLogOut: builder.mutation({
            query: (token) => ({
                url: `/user-logout`,
                method: 'POST',
                headers: { authorization: `Bearer ${token}` }
            }),
            invalidatesTags: ['contact']
        })
    })
})


export const { useGetContactQuery,
    useGetRegisterMutation,
    useGetLoginMutation,
    useGetLogOutMutation } = contactApi;
