import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'

//конфигурация api (настройка)
export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: fetchBaseQuery({ //скелет для запросов
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['groups', 'group', 'students'],
    refetchOnMountOrArgChange: true,
    endpoints: (build) => {
        return {
            getGroups: build.query({
                query: () => {
                    return '/group'
                },
                providesTags: ['groups']
            }),
            createGroup: build.mutation({
                query: (groupBody: any) => {
                    return {
                        url: '/group',
                        method: 'POST',
                        body: groupBody,
                    }
                },
                invalidatesTags: ['groups']
            }),
            deleteGroup: build.mutation({
                query: (id: number | null) => {
                    return{
                        url: `/group/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['groups']
            }),
            getGroupDetails: build.query({
                query: (id: number | null) => {
                    return `/group/${id}`
                },
                providesTags: ['group']
            }),
            deleteStudentFromGroup: build.mutation({
                query: ({id, student_id}: {id: number | null, student_id: number | null}) => {
                    return {
                        url: `/group/${id}/student/${student_id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['group', 'groups']
            }),
            getStudents: build.query({
                query: (studentInputValue: string) => {
                    return `/student/search?query=${studentInputValue}`
                },
                providesTags: ['students']
            }),
            addPersonToTheGroup: build.mutation({
                query: ({id, choosedStudentId}) => {
                    return {
                        url: `/group/${id}/student/${choosedStudentId}`,
                        method: 'PUT'
                    }
                },
                invalidatesTags: ['group', 'groups'] 
                
            })
        }
    }
})

export const {
    useGetGroupsQuery,
    useCreateGroupMutation,
    useDeleteGroupMutation,
    useGetGroupDetailsQuery,
    useDeleteStudentFromGroupMutation,
    useGetStudentsQuery,
    useAddPersonToTheGroupMutation,
} = groupApi