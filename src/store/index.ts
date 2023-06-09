import { alertReducer } from './../modules/layout/store/alert-slice';
import { schoolCooperationsApi } from './../pages/school/api/cooperations-api';
import { authReducer } from './../modules/sign-in/store/auth-slice';
import { scheduleApi } from './../modules/schedule/api/schedule-api';
import { cooperationsApi } from '../modules/cooperation/api/cooperations-api';
import { teachersApi } from './../pages/school/api/teachers-api';
import { studentsApi } from '../modules/student-list/api/students-api'; 
import { groupApi } from './../modules/group-list/api/group-api';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { assignApi } from '../pages/school/api/assign-api';

const rootReducer = combineReducers({
    [groupApi.reducerPath]: groupApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [cooperationsApi.reducerPath]: cooperationsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [schoolCooperationsApi.reducerPath]: schoolCooperationsApi.reducer,
    [assignApi.reducerPath]: assignApi.reducer,
    authReducer,
    alertReducer
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
                    scheduleApi.middleware,
                    schoolCooperationsApi.middleware,
                    assignApi.middleware
                )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']