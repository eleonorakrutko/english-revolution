import { Box, Button, Flex, Text, useDisclosure, useMediaQuery, Icon } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useTypedDispatch } from '../../../hooks/useTypedDispatch'
import { DeleteConfirmModal, List, MdDelete } from '../../../components'
import { showAlert } from '../../../modules/layout/store/alert-slice'
import { Group } from '../../../types/group'
import { CustomButton, CustomSpinner } from '../../../ui'
import { useDeleteGroupFromTeacherMutation, useDeleteStudentFromTeacherMutation, useGetTeacherDetailsQuery } from '../api/teachers-api'

export const TeacherDetailsModule = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    const dispatch = useTypedDispatch()
    const [studentId, setStudentId] = useState<number | null>(null)
    const [groupId, setGroupId] =  useState<number | null>(null)
    const {id} = useParams()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenGroupModal, onOpen: onOpenGroupModal, onClose: onCloseGroupModal } = useDisclosure()
    
    const {data: teacherDetails, isFetching} = useGetTeacherDetailsQuery(id)
    const [deleteStudent, {isSuccess, isError}] = useDeleteStudentFromTeacherMutation()
    const [deleteGroup, {isSuccess: isSuccessDeleteGroup, isError: isErrorDeleteGroup}] = useDeleteGroupFromTeacherMutation()

    useEffect(() => {
        if(isSuccessDeleteGroup){
            dispatch(showAlert({type: 'success', text: 'Group was successfully deleted!',}))
            onClose()
        }
        if(isErrorDeleteGroup){
            dispatch(showAlert({type: 'error', text: 'Failed to delete group!'}))
            onClose()
        }
    }, [isSuccessDeleteGroup, isErrorDeleteGroup])

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Student was successfully deleted!',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to delete student!'}))
            onClose()
        }
    }, [isSuccess, isError])

    const deleteStudentHandler = (user_id: number | null) => {
        deleteStudent({
            "teacher_id": Number(id),
            "student_id": user_id
        })
    }
    const deleteGroupHandler = (group_id: number | null) => {
        deleteGroup({
            "teacher_id": Number(id),
            "group_id": group_id
        })
    }

    const openConfirmModalStudent = (user_id: number | null) => {
        onOpen()
        setStudentId(user_id)
    }
    
    const openConfirmModalGroup = (id: number | null) => {
        onOpenGroupModal()
        setGroupId(id)
    }

    return (
        <>
            <Text fontSize='2xl' mb={2}>Teacher details</Text>
            {isFetching?
                <CustomSpinner/>
                :
                <>
                {isOpen && 
                    <DeleteConfirmModal 
                        typeName='student' 
                        deleteCallback={() => deleteStudentHandler(studentId)}
                        isOpen={isOpen} 
                        onClose={onClose}
                    />
                }
                {isOpenGroupModal &&
                    <DeleteConfirmModal 
                        typeName='group' 
                        deleteCallback={() => deleteGroupHandler(groupId)}
                        isOpen={isOpenGroupModal} 
                        onClose={onCloseGroupModal}
                    />
                }
                <Flex direction='column'>
                    <Text fontSize='2xl'>Students</Text>
                    <List persons={teacherDetails.students} showControl={true} callback={openConfirmModalStudent}/>

                    <Text fontSize='2xl'>Groups</Text>
                    <Box>
                        {teacherDetails.groups.map(({name, students_count, id}: Group) => 
                            <Flex 
                                m='10px 0' 
                                key={id} 
                                bg='white' 
                                align='center' 
                                p={2} 
                                borderRadius='30px' 
                                border='2px solid #B794F4' 
                            >

                                <Flex w='100%' align='center' justify='space-between'>
                                    <Flex direction='column' ml={4}>
                                        <Text mb={1} fontSize={isLargerThan426? 'xl' : 'md'} as='b' color='black'>{name}</Text>
                                        <Flex align='end' fontSize={isLargerThan426? 'md' : 'sm'}>
                                            <Text as='b'>Students count:</Text>
                                            <Text pl={2}>{students_count}</Text>
                                        </Flex> 
                                    </Flex>
                                </Flex>

                                {isLargerThan426? 
                                    <CustomButton
                                        text={isLargerThan426? 'Delete' : ''}
                                        size='lg'
                                        colorSheme="red"
                                        borderRadius="20px"
                                        p='8px'
                                        m='3px'
                                        callback={() => openConfirmModalGroup(id)}
                                        rightIcon={<Icon as={MdDelete} />}
                                    />
                                    :
                                    <Button
                                        colorScheme='red'
                                        borderRadius="20px"
                                        p='3px'
                                        m='3px'
                                        onClick={() => openConfirmModalGroup(id)}
                                    >
                                        <Icon as={MdDelete}/>
                                    </Button>
                                }
                            </Flex>
                        )}
                        {!teacherDetails.groups.length && 
                            <Text fontSize='xl' textAlign='center' mt={4}>This teacher doesn't have groups</Text>
                        }
                    </Box>
                </Flex>
                </>
            }
        </>
    )
}