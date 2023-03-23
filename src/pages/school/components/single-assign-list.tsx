import React from 'react'
import { Box, Flex, Text, Wrap, Checkbox, useMediaQuery, Avatar } from "@chakra-ui/react";
import { Person } from '../../../types/person';
import { Group } from '../../../types/group';

type Props = {
    persons?: Person[],
    groups?: Group[],
    selectedId? : number | null,
    callback: (id: number | null) => void
}


export const SingleAssignList = ({persons, groups, selectedId, callback}: Props) => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    return(
        <Box>
            {persons && 
                <>
                    {persons.map(({first_name, last_name, username, email, id}: Person) => 
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
                                    <Text mb={1} fontSize={isLargerThan426? 'xl' : 'sm'} as='b' color='black'>
                                        {last_name} {first_name}
                                    </Text>
                                        <Text fontSize={isLargerThan426? 'sm' : '10px'} as='b' color='purple.600'>
                                            {username}
                                        </Text>
                                    <Text fontSize={isLargerThan426? 'sm' : '10px'} as='b'>
                                        {email}
                                    </Text>
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
                    )}
                </>
            }

            {groups && 
                <>
                    {groups.map(({name, id, students_count}: Group) => 
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
                                    <Text mb={1} fontSize={isLargerThan426? 'xl' : 'sm'} as='b' color='black'>
                                        {name}
                                    </Text>
                                    <Text fontSize={isLargerThan426? 'sm' : '10px'} as='b'>Students count: {students_count}</Text>
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
                    )}
                </>
            }  
        </Box>
    )
}