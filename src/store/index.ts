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
    [groupApi.reducerPath]: groupApi.reducer,  //из функций createAPI (query, mutation)
    [studentsApi.reducerPath]: studentsApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [cooperationsApi.reducerPath]: cooperationsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [schoolCooperationsApi.reducerPath]: schoolCooperationsApi.reducer,
    [assignApi.reducerPath]: assignApi.reducer,
    authReducer, //из slice
    alertReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()  //здесь под капоптом мы получаем default middleware из RTK
                .concat(
                    groupApi.middleware,  //middleware это функция для кэширования запросов и в случае invalidateTags делать перезапрос
                    studentsApi.middleware,
                    teachersApi.middleware,
                    cooperationsApi.middleware,
                    scheduleApi.middleware,
                    schoolCooperationsApi.middleware,
                    assignApi.middleware
                )
    })
}

export type RootState = ReturnType<typeof rootReducer> //это возвращает interface (тип)
export type AppStore = ReturnType<typeof setupStore> //это тоже interface (тип)
export type AppDispatch = AppStore['dispatch'] //это тип функции dispatch нашего стора