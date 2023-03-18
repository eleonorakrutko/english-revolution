import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['students'],
    refetchOnMountOrArgChange: true,
    endpoints: (build) => {
        return {
            getStudents: build.query({
                query: () => {
                    return `/student`
                },
                providesTags: ['students']
            }),
            deleteStudents: build.mutation({
                query: (id: number | null) => {
                    return {
                        url: `/school/student/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['students']
            })
        }
    }
})

export const {
    useGetStudentsQuery,
    useDeleteStudentsMutation,
} = studentsApi