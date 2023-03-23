import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'


export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['schedule'],
    refetchOnMountOrArgChange: true,
    endpoints: (build) => {
        return{
            getSchedule: build.query({
                query: ({date_from, date_to}) => {
                    return `/schedule?date_from=${date_from}&date_to=${date_to}`
                },
                providesTags: ['schedule']
            }),
            getLessonDetails: build.query({
                query: (id) => {
                    return `/lesson/${id}`
                }
            }),
            deleteLesson: build.mutation({
                query: (id) => {
                    return{
                        url: `/lesson/${id}`,
                        method: 'DELETE',
                    }
                },
                invalidatesTags: ['schedule']
            }),
            createLesson: build.mutation({
                query: (lesson) => {
                    return{
                        url: '/lesson',
                        method: 'POST',
                        body: lesson
                    }
                },
                invalidatesTags: ['schedule']
            }),
            getStudents: build.query({
                query: (studentInputValue: string) => {
                    return `/student/search?query=${studentInputValue}`
                }
            }),
            getGroups: build.query({
                query: () => {
                    return '/group'
                }
            })
        }
        
    }
})

export const {
    useGetScheduleQuery,
    useGetLessonDetailsQuery,
    useDeleteLessonMutation,
    useCreateLessonMutation,
    useGetStudentsQuery,
    useGetGroupsQuery
} = scheduleApi