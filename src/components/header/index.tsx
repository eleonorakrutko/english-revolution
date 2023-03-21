import React from "react";
import { Button,Flex,Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useMediaQuery } from "@chakra-ui/react";
import { Profile } from "./profile";
import styles from './index.module.css'
import {CiMenuBurger} from '../icons'
import { useTypedSelector } from "../../common/hooks/useTypedSelector";
import { getNavItemsByRole } from "../../setup/navigation";
import { RolesEnum } from "../../types/roles-enum";
import { NavLink } from "react-router-dom";

export const Header = () => {
    const { user } = useTypedSelector(state => state.authReducer)

    const navItems = getNavItemsByRole(user?.role_type as RolesEnum)

    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    return (
        <Flex className={styles.wrapper} justify={isLargerThan426? 'end' : 'space-between'}>
            <Flex visibility={isLargerThan426? 'hidden' : 'visible'}>
                <Menu autoSelect={false} >
                    <MenuButton>
                        <Icon as={CiMenuBurger}/>
                    </MenuButton>
                    
                    <MenuList>
                        { navItems.map(({path, title, customIcon}) => 
                            <MenuItem key={path}>
                                <NavLink  className={styles.navigateButton} to={path}>
                                    <Icon as={customIcon} mr={2}/>
                                    {title}
                                </NavLink>
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
            <Profile/>
        </Flex>
    )
}