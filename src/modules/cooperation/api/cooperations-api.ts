import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../../services/cookie-service'

export const cooperationsApi = createApi({
    reducerPath: 'coopeartionsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${CookiesService.getAuthorizationToken()}`)
            headers.set('accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['cooperations'],
    refetchOnMountOrArgChange: true,
    endpoints: (build) => {
        return {
            getIncomingCooperations: build.query({
                query: (query: string) => {
                    return `/cooperation/incoming?${query}`
                },
                providesTags: ['cooperations']
            }),
           
            makeDecision: build.mutation({
                query: ({id, status}: {id: number | null, status: string}) => {
                    return{
                        url: `/cooperation/${id}/status`,
                        method: 'PATCH',
                        body: {
                            status
                        }
                    }
                },
                invalidatesTags: ['cooperations']
            })
        }
    }
})

export const {
    useGetIncomingCooperationsQuery,
    useMakeDecisionMutation,
} = cooperationsApi