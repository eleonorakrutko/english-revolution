import { Box, Text, Icon, Wrap } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getNavItemsByRole } from "../../setup/navigation";
import { RolesEnum } from "../../types/roles-enum";
import styles from './index.module.css'


export const Navigation = () => {
    const { user } = useTypedSelector(state => state.authReducer)

    const navItems = getNavItemsByRole(user?.role_type as RolesEnum)

    return(
        <Wrap className={styles.wrapper} >
            <Box className={styles.wrapperText}>
                <Text color='black'>Revolution</Text>
                <Text color='purple.600' pl={2}>English!</Text>
            </Box>
            <Box className={styles.wrapperButton} mt={0}>
                { navItems.map(({path, title, customIcon}) => 
                    <NavLink key={path} className={styles.navigateButton} to={path}>
                        <Icon as={customIcon} mr={2}/>
                            {title}
                    </NavLink>
                )}
            </Box>
        </Wrap>
    )
}

//в общий модуль