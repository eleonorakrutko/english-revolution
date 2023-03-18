import React from 'react'
import { Box, Flex, Text, Wrap, Checkbox } from "@chakra-ui/react";
import { CustomAvatar } from '../../../ui';

type Props = {
    persons?: any,
    groups?: any,
    selectedId? : number | null,

    callback: (id: number | null) => void
}

type Arguments = {
    id: number,
    first_name: string,
    last_name: string,
    username: string, 
    email: string,
}

type GroupArguments = {
    id: number,
    name: string,
    students_count: number,
}

export const SingleAssignList = ({persons, groups, selectedId, callback}: Props) => {
   
    return(
        <Box>
            {persons && 
                <>
                    {persons.map(({first_name, last_name, username, email, id}: Arguments) => 
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
                                    </Flex>
                                </Flex>
                                <Checkbox 
                                    isChecked={id === selectedId}
                                    onChange={(event) => {
                                        if(event.target.checked){
                                            callback(id)
                                            return
                                        }
                                        callback(null)
                                    }}
                                    size='lg' 
                                    colorScheme='purple' 
                                    mr={4}
                                />
                            </Flex>
                        )
                    }
                </>
            }

            {groups && 
                <>
                    {groups.map(({name, id, students_count}: GroupArguments) => 
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
                                    <Flex direction='column' ml={4}>
                                        <Text mb={1} fontSize='xl' as='b' color='black'>{name}</Text>
                                        <Text fontSize='sm' as='b'>Students count: {students_count}</Text>
                                    </Flex>
                                </Flex>
                                <Checkbox 
                                    isChecked={id === selectedId}
                                    onChange={(event) => {
                                        if(event.target.checked){
                                            callback(id)
                                            return
                                        }
                                        callback(null)
                                    }}
                                    size='lg' 
                                    colorScheme='purple' 
                                    mr={4}
                                />
                            </Flex>
                        )
                    }
                </>
            }
            
        </Box>
    )
}