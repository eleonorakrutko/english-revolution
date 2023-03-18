import { authReducer } from './../modules/sign-in/store/auth-slice';

import { scheduleApi } from './../modules/schedule/api/schedule-api';
import { cooperationsApi } from '../modules/cooperation/api/cooperation-api';
import { teachersApi } from './../pages/school/api/teachers-api';
import { studentsApi } from '../modules/student-list/api/students-api'; 
import { groupApi } from './../modules/group-list/api/group-api';
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    [groupApi.reducerPath]: groupApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [cooperationsApi.reducerPath]: cooperationsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()
                .concat(
                    groupApi.middleware,
                    studentsApi.middleware,
                    teachersApi.middleware,
                    cooperationsApi.middleware,
                    scheduleApi.middleware
                )
        
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']