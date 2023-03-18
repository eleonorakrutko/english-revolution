import React from 'react'
import { Box, Flex, Text, Wrap, Icon } from "@chakra-ui/react";
import { CustomAvatar, CustomButton } from '../../ui';
import { MdDelete, MdPersonAddAlt1 } from '../icons';
import { RolesEnum } from '../../types/roles-enum';
import { useTypedSelector } from '../../common/hooks/useTypedSelector';

type Props = {
    persons: any,
    showControl?: boolean,
    showInvite? : boolean,
    callback?: (user_id: number) => void
}

type Arguments = {
    id: number,
    first_name: string,
    last_name: string,
    username: string, 
    email: string,
    user_id: number
}

export const List = ({persons, showControl = false, callback, showInvite = false}: Props) => {
    const { user } = useTypedSelector(state => state.authReducer)
    return(
        <Box>
            {persons.map(({first_name, last_name, username, email, id, user_id}: Arguments) => 
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
                        
                        {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN &&
                            <>
                                {(showControl && callback) && 
                            <Flex mr={3}>
                                <CustomButton
                                    text='Delete'
                                    colorSheme='red'
                                    borderRadius='20px'
                                    rightIcon={<Icon as={MdDelete}/>}
                                    callback={() => callback(user_id)}
                                />
                            </Flex>
                        }

                            </>
                        }
                        
                        {(showInvite && callback) && 
                            <Flex mr={3}>
                                <CustomButton
                                    text='Cooperation'
                                    colorSheme='whatsapp'
                                    borderRadius='20px'
                                    rightIcon={<Icon as={MdPersonAddAlt1}/>}
                                    callback={() => callback(user_id)}
                                />
                            </Flex>
                        }
                    </Flex>
                )
            }
        </Box>
    )
}