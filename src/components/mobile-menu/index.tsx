import { Flex, Menu, MenuButton, Icon, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { CiMenuBurger } from "../icons"
import { NavLink } from "react-router-dom";
import styles from './index.module.css'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getNavItemsByRole } from "../../setup/navigation";
import { RolesEnum } from "../../types/roles-enum";


export const MobileMenu = () => {
    const { user } = useTypedSelector(state => state.authReducer)

    const navItems = getNavItemsByRole(user?.role_type as RolesEnum)
    return(
        <Flex>
            <Menu autoSelect={false} >
                <MenuButton>
                    <Icon as={CiMenuBurger}/>
                </MenuButton>
                    
                <MenuList>
                    { navItems.map(({path, title, customIcon}) => 
                        <MenuItem key={path}>
                            <NavLink className={styles.navigateButton} to={path}>
                                <Icon as={customIcon} mr={2}/>
                                {title}
                            </NavLink>
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
        </Flex>
    )
}