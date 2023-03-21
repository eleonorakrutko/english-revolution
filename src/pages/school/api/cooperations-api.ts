import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'

export const schoolCooperationsApi = createApi({
    reducerPath: 'schoolCoopeartionsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['schoolCooperations'],
    refetchOnMountOrArgChange: true,
    endpoints: (build) => {
        return {
            getNewStudents: build.query({
                query: () => {
                    return `/student/search/new`
                }
            }),
            getNewTeachers: build.query({
                query: () => {
                    return '/teacher/search/new'
                }
            }),
            getOutgoingCooperations: build.query({
                query: (query: string) => {
                    return `/cooperation/outgoing?${query}`
                },
                providesTags: ['schoolCooperations']
            }),
            sendInvite: build.mutation({
                query: (inviteBody) => {
                    return{
                        url: '/cooperation',
                        method: 'POST',
                        body: inviteBody,
                    }
                },
                invalidatesTags: ['schoolCooperations']
            }),
        }
    }
})

export const {
    useGetNewStudentsQuery,
    useGetNewTeachersQuery,
    useGetOutgoingCooperationsQuery,
    useSendInviteMutation,
} = schoolCooperationsApi