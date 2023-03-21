import React, { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignIn, SignUp } from "../../pages";
import { Layout } from "../../modules";
import { getPagesByRole } from "../../setup/navigation";
import { useTypedDispatch } from "../../common/hooks/useTypedDispatch";
import { checkAuthorization } from "../../modules/sign-in/store/action-creators";
import { useTypedSelector } from "../../common/hooks/useTypedSelector";
import { CustomSpinner } from "../../ui";

interface Route {
    path: string,
    page: React.FC,
}

export const AppRouter = () => {
    const dispatch = useTypedDispatch()
    const { user, loading, error } = useTypedSelector(state => state.authReducer)

    useEffect(() => {
        dispatch(checkAuthorization())
    }, [])

    return (
        <>
            {loading? 
                <CustomSpinner/>
                :
                <Routes>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>

                    {error && 
                        <Route path='/' element={<Navigate to={"/sign-in"}/>}/>
                    }
                 
                    {user && 
                        <Route path="/" element={<Layout/>}>
                            <Route path='' element={<Navigate to={getPagesByRole(user.role_type)[0].path}/>}/>
                            { getPagesByRole(user.role_type).map(({page: Page, path}: Route) => 
                                <Route key={path} path={path} element={<Page/>}/>
                            )}
                        </Route>
                    }
                </Routes>
            } 
        </>
    )
} 