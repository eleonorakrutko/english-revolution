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
    tagTypes: ['teachers'],
    refetchOnMountOrArgChange: true,  //при каждом маунтинге (это когда компонент появляется на экране)
    endpoints: (build) => {
        return {
            assignGroupToTeacher: build.mutation({
                query: ({group_id, teacher_id}) => {
                    return {
                        url: `/group/${group_id}/teacher/${teacher_id}`,
                        method: 'PATCH'
                    }
                }
            }),
            assignStudentsToTeacher: build.mutation({
                query: (body) => {
                    return{
                        url: '/school/teacher/assign/students',
                        method: 'POST',
                        body: body
                    }
                }
            })
        }
    }
})

export const {
    useAssignGroupToTeacherMutation,
    useAssignStudentsToTeacherMutation,
} = assignApi