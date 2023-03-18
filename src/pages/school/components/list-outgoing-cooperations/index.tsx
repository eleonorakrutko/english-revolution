import React from 'react'
import { Box, Flex, Text, Wrap } from "@chakra-ui/react";
import { CustomAvatar } from '../../../../ui'; 
import moment from 'moment';

type Props = {
    cooperations: any,
}

type Arguments = {
    id: number,
    first_name: string,
    last_name: string,
    username: string, 
    email: string,
    status: string,
    created_at: string,
}

export const ListOutgoingCooperations = ({cooperations}: Props) => {
    return(
        <Box>
            {cooperations.map(({first_name, last_name, username, email, id, status, created_at}: Arguments) => 
                    <Flex 
                        m='10px 0' 
                        key={id} 
                        bg='white' 
                        align='center' 
                        p={2} 
                        borderRadius='30px' 
                        border='2px solid #B794F4' 
                        justify='space-between'
                    >
                        <Flex align='center'>
                            <Wrap>
                                <CustomAvatar size='lg' name='Dan Abramov' src='https://bit.ly/kent-c-dodds'/>
                            </Wrap>
                            <Flex direction='column' ml={4}>
                                <Text mb={1} fontSize='xl' as='b' color='black'>{last_name} {first_name}</Text>
                                <Text fontSize='sm' as='b' color='purple.600'>{username}</Text>
                                <Text fontSize='sm' as='b'>{email}</Text>
                                <Text mt={2}>{moment(created_at).format('MMMM, DD HH:mm')}</Text>
                            </Flex>
                        </Flex>
                        <Text mr={3}>{status}</Text>
                    </Flex>
                )
            }
        </Box>
    )
}