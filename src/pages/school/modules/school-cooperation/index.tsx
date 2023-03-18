import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { List } from "../../../../components";
import { CustomSpinner } from "../../../../ui";
import { useGetNewStudentsQuery, useGetNewTeachersQuery } from "../../../../modules/cooperation/api/cooperation-api"; 
import { InviteModal } from "../../../../modules/cooperation/components/modal/invite-modal"; 
import styles from './index.module.css'


export const SchoolCooperationModule = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userId, setUserId] = useState<number | null>(null)
 
    const {data: newStudents, isFetching} = useGetNewStudentsQuery('')
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
            
            {isOpen && 
                <InviteModal 
                    isOpen={isOpen} 
                    onClose={onClose}
                    user_id={userId}
                />
            }

      
            <Flex justify='space-around' mt={5}>
                <Flex direction='column' w='45%'>
                    {isFetching?
                        <CustomSpinner/>
                        :
                        <>
                            <Text fontSize='2xl' textAlign='center' as='b'>New Students</Text>
                            <List persons={newStudents} showInvite={true} callback={openInviteModal}/>
                        </>
                    }
                </Flex>
                <Flex direction='column' w='45%'>
                    {isFetchingNewTeachers?
                        <CustomSpinner/>
                        :
                        <>
                            <Text fontSize='2xl' textAlign='center' as='b'>New Teachers</Text>
                            <List persons={newTeachers} showInvite={true} callback={openInviteModal}/>
                        </>
                    }
                </Flex>
            </Flex>  
        </>
    )
}