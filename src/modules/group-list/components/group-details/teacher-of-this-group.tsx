import { Flex, Text, useMediaQuery, Wrap, Icon, Button } from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector";
import { Person } from "../../../../types/person";
import { CustomAvatar } from "../../../../ui";

type Props = {
    teacher: Person,

}

export const TeacherOfThisGroup = ({teacher}: Props) => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    const { user } = useTypedSelector(state => state.authReducer)
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
                    <CustomAvatar size={isLargerThan426? 'lg' : 'md'} name='Dan Abramov' src='https://bit.ly/kent-c-dodds'/>
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