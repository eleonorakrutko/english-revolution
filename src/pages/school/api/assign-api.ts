import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'

export const assignApi = createApi({
    reducerPath: 'assignApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['teachers', 'students', 'groups'],
    refetchOnMountOrArgChange: true, 
    endpoints: (build) => {
        return {
            assignGroupToTeacher: build.mutation({
                query: ({group_id, teacher_id}) => {
                    return {
                        url: `/group/${group_id}/teacher/${teacher_id}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['groups']
            }),
            assignStudentsToTeacher: build.mutation({
                query: (body) => {
                    return{
                        url: '/school/teacher/assign/students',
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['students']
            }),
            getStudentForAssign: build.query({
                query: (teacher_id) => {
                    return `/student/assign/${teacher_id}`
                },
                providesTags:['students']
            }),
            getGroupForAssign: build.query({
                query: (teacher_id) => {
                    return `/group/assign/${teacher_id}`
                },
                providesTags:['groups']
            })
        }
    }
})

export const {
    useAssignGroupToTeacherMutation,
    useAssignStudentsToTeacherMutation,
    useGetStudentForAssignQuery,
    useGetGroupForAssignQuery
} = assignApi