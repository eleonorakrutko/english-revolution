import React from "react";
import { Flex, Box, Text } from '@chakra-ui/react'
import styles from './index.module.css'

type Props = {
    week: string[],  
}

export const DaysOfTheWeek = ({week}: Props) => {
    return(
        <Flex 
            className={styles.wrapper}  
            align='center'  
            bg='gray.100' 
        >
            {week.map((day, index) => <Box key={index}><Text>{day}</Text></Box>)}
            
        </Flex>
    )
}