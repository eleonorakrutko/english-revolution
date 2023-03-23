import React from "react";
import { Icon, Text, Flex, Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomPopover } from "../../../ui";
import { MdLogout } from "../../icons";
import CookiesService from "../../../services/cookie-service";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { setUser } from "../../../modules/sign-in/store/auth-slice";

export const Profile = () => {
    const { user } = useTypedSelector(state => state.authReducer)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(setUser(null))
        CookiesService.removeAuthorizationToken()
        navigate('/sign-in')
    }
    
    return(
        <Flex align='center'>
            <Text as='b' mr={3}>{user?.first_name} {user?.last_name}</Text>
            <CustomPopover 
                trigger={<button><Avatar name='Dan Abramov' src="https://bit.ly/dan-abramov"/></button>} 
                content={
                    <CustomButton 
                        text="Log out" 
                        rightIcon={<Icon as={MdLogout}/>} 
                        variant="outline" 
                        callback={logout}
                    />
                }
            />
        </Flex>
    )
}