import { Avatar, Flex, Text, useMediaQuery, Wrap } from "@chakra-ui/react";
import React from "react";
import { Person } from "../../../../types/person";

type Props = {
    teacher: Person,
}

export const TeacherOfThisGroup = ({teacher}: Props) => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    return (
        <Flex 
            m='10px 0'  
            bg='white' 
            align='center' 
            p={2} 
            borderRadius='30px' 
            border='2px solid #B794F4' 
            justify='space-between'
        >
            <Flex 
                align='center' 
                w={isLargerThan426? 'fit-content' : '100%'}
            >
                <Wrap>
                    <Avatar size={isLargerThan426? 'lg' : 'md'} name='Dan Abramov' src='https://bit.ly/kent-c-dodds'/>
                </Wrap>
                <Flex direction='column' ml={4}>
                    <Text mb={1} fontSize={isLargerThan426? 'xl' : 'sm'} as='b' color='black'>
                        {teacher.last_name} {teacher.first_name}
                    </Text>
                    <Text fontSize={isLargerThan426? 'sm' : '10px'} as='b' color='purple.600'>
                        {teacher.username}
                    </Text>
                    <Text fontSize={isLargerThan426? 'sm' : '10px'} as='b'>
                        {teacher.email}
                    </Text>
                </Flex>
            </Flex>     
        </Flex>
    )
}