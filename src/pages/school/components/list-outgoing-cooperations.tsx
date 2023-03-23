import React from 'react'
import { Avatar, Box, Flex, Text, useMediaQuery, Wrap } from "@chakra-ui/react"; 
import moment from 'moment';
import { Cooperations } from '../../../types/cooperations';

type Props = {
    cooperations: Cooperations[],
}

export const ListOutgoingCooperations = ({cooperations}: Props) => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    
    return(
        <Box>
            {cooperations.map(({first_name, last_name, username, email, id, status, created_at}: Cooperations) => 
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
                                <Avatar size={isLargerThan426? 'lg' : 'md'} name='Dan Abramov' src='https://bit.ly/kent-c-dodds'/>
                            </Wrap>
                            <Flex direction='column' ml={4}>
                                <Text mb={1} fontSize={isLargerThan426? 'xl' : 'sm'} as='b' color='black'>{last_name} {first_name}</Text>
                                <Text fontSize={isLargerThan426? 'sm' : 'xs'} as='b' color='purple.600'>{username}</Text>
                                <Text fontSize={isLargerThan426? 'sm' : 'xs'} as='b'>{email}</Text>
                                <Text fontSize={isLargerThan426? 'md' : 'xs'}  mt={2}>{moment(created_at).format('MMMM, DD HH:mm')}</Text>
                            </Flex>
                        </Flex>
                        <Text fontSize={isLargerThan426? 'md' : 'xs'}  mr={3}>{status}</Text>
                    </Flex>
                )
            }
        </Box>
    )
}