import React from 'react'
import { Box, Flex, Text, Wrap, Icon, useMediaQuery, Button } from "@chakra-ui/react";
import { CustomAvatar, CustomButton } from '../../ui';
import { MdContentPasteSearch, MdDelete, MdPersonAddAlt1 } from '../icons';
import { RolesEnum } from '../../types/roles-enum';
import { useTypedSelector } from '../../common/hooks/useTypedSelector';
import { Person } from '../../types/person';
import { NavLink } from 'react-router-dom';
import styles from './index.module.css'


type Props = {
    persons: Person[],
    showControl?: boolean,
    showInvite? : boolean,
    showTeacherDetails? : boolean,
    callback?: (user_id: number) => void
}


export const List = ({persons, showControl = false, showTeacherDetails = false, callback, showInvite = false}: Props) => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    const { user } = useTypedSelector(state => state.authReducer)
    return(
        <Box>
            {persons.map(({first_name, last_name, username, email, id, user_id}: Person) => 
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
                        <Flex 
                            align='center' 
                            w={isLargerThan426? 'fit-content' : '100%'}
                        >
                            <Wrap>
                                <CustomAvatar size={isLargerThan426? 'lg' : 'md'} name='Dan Abramov' src='https://bit.ly/kent-c-dodds'/>
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
                        
                        {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN &&
                            <Flex direction='column'>
                                {showTeacherDetails &&
                                    <NavLink 
                                        to={`/teacher-details/${id}`} 
                                        className={styles.navigateButton}
                                    >
                                        <Flex align='center' justify='center'>
                                            {isLargerThan426? 
                                                <>
                                                    <Text ml='5px'>Details</Text>
                                                    <Icon as={MdContentPasteSearch} ml={2} mr={1.5}/>
                                                </>
                                                :
                                                <Icon as={MdContentPasteSearch} ml={2} mr={1.5}/>
                                            } 
                                        </Flex>
                                    </NavLink>
                                }
                                {(showControl && callback) && 
                                    <Flex ml={isLargerThan426? '' : 3}>
                                        {isLargerThan426? 
                                            <CustomButton
                                                text={isLargerThan426? 'Delete' : ''}
                                                size='lg'
                                                colorSheme="red"
                                                borderRadius="20px"
                                                p='8px'
                                                m='3px'
                                                callback={() => callback(user_id)}
                                                rightIcon={<Icon as={MdDelete} />}
                                            />
                                            :
                                            <Button
                                                colorScheme='red'
                                                borderRadius="20px"
                                                p='3px'
                                                m='3px'
                                                onClick={() => callback(user_id)}
                                            >
                                                <Icon as={MdDelete}/>
                                            </Button>
                                        }
                                    </Flex>
                                }
                            </Flex>
                        }
                        
                        {(showInvite && callback) && 
                            <Flex>
                                <CustomButton
                                    text={isLargerThan426? 'Cooperation' : ''}
                                    size={isLargerThan426? 'lg' : 'xs'}
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
            {!persons.length && 
                <Text fontSize='xl' textAlign='center' mt={4}>There are no persons here</Text>
            }
        </Box>
    )
}