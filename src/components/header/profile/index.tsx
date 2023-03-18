import React from "react";
import { Wrap, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CustomAvatar, CustomButton, CustomPopover } from "../../../ui";
import styles from './index.module.css'
import { MdLogout } from "../../icons";
import CookiesService from "../../../services/cookie-service";
import { useTypedSelector } from "../../../common/hooks/useTypedSelector";
import { useTypedDispatch } from "../../../common/hooks/useTypedDispatch";
import { setUser } from "../../../modules/sign-in/store/auth-slice";

export const Profile = () => {
    const navigate = useNavigate()
    const { user } = useTypedSelector(state => state.authReducer)
    const dispatch = useTypedDispatch()
    console.log(user)

    const logout = () => {
        dispatch(setUser(null))
        CookiesService.removeAuthorizationToken()
        navigate('/sign-in')
    }
    
    return(
        <Wrap align='center' className={styles.profileWrapper}>
            <p>{user?.first_name} {user?.last_name}</p>
            <p style={{fontWeight: 'bold'}}>{user?.role_type}</p>
            <CustomPopover 
                trigger={<button><CustomAvatar name='Dan Abramov' src="https://bit.ly/dan-abramov"/></button>} 
                content={
                    <CustomButton 
                        text="Log out" 
                        rightIcon={<Icon as={MdLogout}/>} 
                        variant="outline" 
                        callback={logout}
                    />
                }
            />
        </Wrap>
    )
}