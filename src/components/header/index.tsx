import React from "react";
import { Box } from "@chakra-ui/react";
import { Profile } from "./profile";
import styles from './index.module.css'

export const Header = () => {
    return (
        <Box className={styles.wrapper}>
            <Profile/>
        </Box>
    )
}