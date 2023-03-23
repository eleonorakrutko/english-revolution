import React from "react";
import { Flex,  useMediaQuery } from "@chakra-ui/react";
import { Profile } from "./profile";
import { MobileMenu } from "../mobile-menu";

export const Header = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    return (
        <Flex align='center' h='100%' p={5} justify={isLargerThan426? 'end' : 'space-between'}>
            {!isLargerThan426 &&
                <MobileMenu/>
            }
            <Profile/>
        </Flex>
    )
}