import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactListApi = createApi({
    reducerPath: 'contactListApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://contact-app.mmsdev.site/api/v1` }),
    tagTypes: ['contactList'],
    endpoints: (builder) => ({
        getContact: builder.query({
            query: (token) => ({
                url: './contact',
                headers: { authorization: `Bearer ${token}` }
            }),
            providesTags: ['contactList']
        }),
        createContact: builder.mutation({
            query: ({ token, data }) => ({
                url: './contact',
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                body: data,
            }),
            invalidatesTags: ['contactList'],
        }),
        deleteContact: builder.mutation({
            query: ({ id, token }) => ({
                url: `/contact/${id}`,
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            }),
            invalidatesTags: ['contactList'],
        }),
        getSingleContact: builder.query({
            query:({token,id,contact}) => ({
                url:`/contact/${id}`,
                body : contact,
                headers:{authorization:`Bearer ${token}`}
            }),
            providesTags:['contactList']
        }),
        editContact: builder.mutation({
            query:({id,contact,token}) => ({
                url : `/contact/${id}`,
                method : "PATCH",
                body : contact,
                headers : {authorization : `Bearer ${token}`}
            }),
            invalidatesTags:["contactList"]
        })
    })
})


export const { useGetContactQuery, useCreateContactMutation, useDeleteContactMutation, useGetSingleContactQuery, useEditContactMutation } = contactListApi;