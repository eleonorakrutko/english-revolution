import { ButtonGroup, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { List } from "../../../../components";
import { CustomButton, CustomSpinner } from "../../../../ui";
import { InviteModal } from "../../components/modal/invite-modal"; 
import styles from './index.module.css'
import { useGetNewStudentsQuery, useGetNewTeachersQuery } from "../../api/cooperations-api";


export const SchoolCooperationModule = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userId, setUserId] = useState<number | null>(null)
    const [type, setType] = useState<string>('students')
 
    const {data: newStudents, isFetching: isFetchingNewStudents} = useGetNewStudentsQuery('')
    const {data: newTeachers, isFetching: isFetchingNewTeachers} = useGetNewTeachersQuery('')
   
    const openInviteModal = (user_id: number) => {
        onOpen()
        setUserId(user_id)
    }

    return(
        <>
            <NavLink to={'/outgoing-cooperations'}>
                <Flex align='center' justify='center' className={styles.navigateButton} >
                    <Text ml='5px'>Outgoing cooperations</Text>
                </Flex>
            </NavLink>

            <Flex justify='center' mt={3}>
                <ButtonGroup>
                    <CustomButton 
                        text='New students' 
                        callback={() => setType('students')}
                        variant={type === 'students'? 'solid' : 'outline'} 
                    />
                    <CustomButton 
                        text='New teachers' 
                        callback={() => setType('teachers')}
                        variant={type === 'teachers'? 'solid' : 'outline'}
                    />
                </ButtonGroup>
            </Flex>
            
            {isOpen && 
                <InviteModal 
                    isOpen={isOpen} 
                    onClose={onClose}
                    user_id={userId}
                />
            }

            {(type === 'students') && 
                <Flex direction='column' mt={2}>
                    {isFetchingNewStudents?
                        <CustomSpinner/>
                        :
                        <>
                            <Text fontSize='2xl' textAlign='center' as='b'>New Students</Text>
                            <List persons={newStudents} showInvite={true} callback={openInviteModal}/>
                        </>
                    }
                </Flex>
            }

            {(type === 'teachers') &&
                <Flex direction='column' mt={2}>
                    {isFetchingNewTeachers?
                        <CustomSpinner/>
                        :
                        <>
                            <Text fontSize='2xl' textAlign='center' as='b'>New Teachers</Text>
                            <List persons={newTeachers} showInvite={true} callback={openInviteModal}/>
                        </>
                    }
                </Flex>
            }
        </>
    )
}