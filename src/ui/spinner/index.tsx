import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export const CustomSpinner = () => {
    return(
        <Flex h='100%' w='100%' justify='center'align='center'>
            <Spinner  color='purple.600' size='xl' thickness='4px'/>
        </Flex> 
    )
}