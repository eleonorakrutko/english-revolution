import { Flex, Text, useMediaQuery, Wrap } from "@chakra-ui/react";
import React from "react";
import { useTypedSelector } from "../../common/hooks/useTypedSelector";
import { RolesEnum } from "../../types/roles-enum";
import { CustomAvatar } from "../../ui";

export const ProfileModule = () => {
    const { user } = useTypedSelector(state => state.authReducer)

    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    return (
        <Flex direction='column' p={4}>
            <Flex direction={isLargerThan426? 'row' : 'column'} align='center' justify='space-between' bgGradient='linear(to-l, #9F7AEA, #E9D8FD)' borderRadius='20px' p={4}>
                <Flex align='center' >
                    <CustomAvatar size="lg" name='Dan Abramov' src="https://bit.ly/dan-abramov"/>
                    <Flex direction='column'ml={4} mb={isLargerThan426? 0 : 2}>
                        <Text fontSize={isLargerThan426? '3xl' : 'lg'}  as='b'>
                            {user?.first_name} {user?.last_name}
                        </Text>
                        <Flex 
                            direction='column' 
                            fontSize={isLargerThan426? 'md' : 'sm'}
                        >
                            <Wrap>
                                <Text as='b'>Username:</Text>
                                <Text as='b' color='purple.600'>{user?.username}</Text>
                            </Wrap>
                            <Wrap>
                                <Text as='b'>Email:</Text>
                                <Text as='b' color='purple.600'>{user?.email}</Text>
                            </Wrap>
                        </Flex>  
                    </Flex>
                </Flex>
                <Flex p={4} bg='gray.100' borderRadius='20px'>
                    {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN? 
                        <Text as='b' fontSize={isLargerThan426? 'md' : 'xs'}>SCHOOL</Text>
                        :
                        <Text as='b'>{user?.role_type}</Text>
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}