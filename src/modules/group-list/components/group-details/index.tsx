import React, { useState, useEffect } from 'react'
import { Flex, Text, useDisclosure, Icon, useMediaQuery, Button } from '@chakra-ui/react'
import { CustomButton, CustomSpinner } from '../../../../ui'
import { useParams } from 'react-router-dom'
import { DeleteConfirmModal, MdPersonAddAlt1 } from '../../../../components' 
import { List } from '../../../../components'
import { useDeleteStudentFromGroupMutation, useGetGroupDetailsQuery } from '../../api/group-api'
import { RolesEnum } from '../../../../types/roles-enum'
import { useTypedSelector } from '../../../../common/hooks/useTypedSelector'
import { AddPersonModal } from '../modal'
import { showAlert } from '../../../layout/store/alert-slice'
import { useTypedDispatch } from '../../../../common/hooks/useTypedDispatch'
import { TeacherOfThisGroup } from './teacher-of-this-group'

export const GroupDetailsComponent = () => {
    const { id } = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [studentId, setStudentId] = useState<number | null>(null)
    const { user } = useTypedSelector(state => state.authReducer)
    const { isOpen: isOpenAddPersons, onOpen: onOpenAddPersons, onClose: onCloseAddPersons } = useDisclosure()

    const {data: group, isFetching} = useGetGroupDetailsQuery(Number(id), {
        skip: isOpenAddPersons  //не вызвается и не ререндерится пока не закрыта модалка
    })
    
    const [deleteStudent, {isSuccess, isError}] = useDeleteStudentFromGroupMutation()
    const dispatch = useTypedDispatch()
    const openConfirmModal = (user_id: number) => {
        onOpen()
        setStudentId(user_id as number)
    } 

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Student was successfully deleted!',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to delete student from group!'}))
            onClose()
        }
    }, [isSuccess, isError])

    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    return(
        <>   
            {isFetching ?
                <CustomSpinner/>
                :
                <>
                    {isOpen && 
                        <DeleteConfirmModal 
                            typeName='student' 
                            deleteCallback={() => deleteStudent({id: Number(id), student_id: studentId})}
                            isOpen={isOpen} 
                            onClose={onClose}
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