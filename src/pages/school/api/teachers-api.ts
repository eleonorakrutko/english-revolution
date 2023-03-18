import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'

export const teachersApi = createApi({
    reducerPath: 'teachersApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['teachers'],
    refetchOnMountOrArgChange: true,  //при каждом маунтинге (это когда компонент появляется на экране)
    endpoints: (build) => {
        return {
            getTeachers: build.query({
                query: () => {
                    return `/teacher`
                },
                providesTags: ['teachers']
            }),
            deleteTeachers: build.mutation({
                query: (id: number | null) => {
                    return {
                        url: `/school/teacher/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['teachers']
            })
        }
    }
})

export const {
    useGetTeachersQuery,
    useDeleteTeachersMutation,
} = teachersApi