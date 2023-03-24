import React, { useState, useEffect } from 'react'
import { Flex, Text, useDisclosure, Icon, useMediaQuery, Button } from '@chakra-ui/react'
import { CustomButton, CustomSpinner } from '../../../../ui'
import { useParams } from 'react-router-dom'
import { DeleteConfirmModal, MdPersonAddAlt1 } from '../../../../components' 
import { List } from '../../../../components'
import { useDeleteStudentFromGroupMutation, useGetGroupDetailsQuery } from '../../api/group-api'
import { RolesEnum } from '../../../../types/roles-enum'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { AddPersonModal } from '../modal'
import { showAlert } from '../../../layout/store/alert-slice'
import { useTypedDispatch } from '../../../../hooks/useTypedDispatch'
import { TeacherOfThisGroup } from './teacher-of-this-group'

export const GroupDetailsComponent = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    const { user } = useTypedSelector(state => state.authReducer)
    const dispatch = useTypedDispatch()

    const [studentId, setStudentId] = useState<number | null>(null)
    const { id } = useParams()

    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure()
    const { isOpen: isOpenAddPersons, onOpen: onOpenAddPersons, onClose: onCloseAddPersons } = useDisclosure()

    const {data: group, isFetching} = useGetGroupDetailsQuery(Number(id), {
        skip: isOpenAddPersons 
    })
    const [deleteStudent, {isSuccess, isError}] = useDeleteStudentFromGroupMutation()

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Student was successfully deleted!',}))
            onCloseDeleteModal()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to delete student from group!'}))
            onCloseDeleteModal()
        }
    }, [isSuccess, isError])

    const openConfirmModal = (user_id: number) => {
        onOpenDeleteModal()
        setStudentId(user_id as number)
    } 

    return(
        <>   
            {isFetching ?
                <CustomSpinner/>
                :
                <>
                    {isOpenDeleteModal && 
                        <DeleteConfirmModal 
                            typeName='student' 
                            deleteCallback={() => deleteStudent({id: Number(id), student_id: studentId})}
                            isOpen={isOpenDeleteModal} 
                            onClose={onCloseDeleteModal}
                        />
                    }
                    
                    <Flex justify='space-between' align='center'>
                        <Text fontSize='2xl'>Group {group.name} details</Text>
                        {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN && 
                            <>
                                {isOpenAddPersons && 
                                    <AddPersonModal isOpen={isOpenAddPersons} onClose={onCloseAddPersons} id={id}/>
                                }
                                {isLargerThan426?
                                    <CustomButton 
                                        text='Add person' 
                                        size='lg'
                                        borderRadius='20px'
                                        rightIcon={<Icon as={MdPersonAddAlt1}/>}
                                        callback={onOpenAddPersons}
                                    />
                                    :
                                    <Button
                                        colorScheme='purple'
                                        size='md'
                                        borderRadius='20px'
                                        onClick={onOpenAddPersons}
                                    >
                                        <Icon as={MdPersonAddAlt1}/>
                                    </Button>
                                }
                            </>
                        }
                    </Flex>
                    <Flex direction='column' mt={4}>
                        {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN && 
                            <>
                                <Text fontSize='2xl'>Teacher</Text>
                                {group.teacher? 
                                    <TeacherOfThisGroup teacher={group.teacher}/>
                                    :
                                    <Text fontSize='xl' textAlign='center'>There is no teacher here</Text>
                                }
                            </>
                        }
                        
                        <Text fontSize='2xl'>Students</Text>
                        <List persons={group.students} showControl={true} callback={openConfirmModal}/>
                    </Flex>
                </>
            }
        </>
    )
}