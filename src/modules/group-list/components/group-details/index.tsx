import React, { useState } from 'react'
import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { CustomSpinner } from '../../../../ui'
import { useParams } from 'react-router-dom'
import { DeleteConfirmModal } from '../../../../components' 
import { List } from '../../../../components'
import { AddPersonToTheGroupModule } from '../add-person-to-the-group'
import { useDeleteStudentFromGroupMutation, useGetGroupDetailsQuery } from '../../api/group-api'
import { RolesEnum } from '../../../../types/roles-enum'
import { useTypedSelector } from '../../../../common/hooks/useTypedSelector'

export const GroupDetailsModule = () => {
    const { id } = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [studentId, setStudentId] = useState<number | null>(null)
    const { user } = useTypedSelector(state => state.authReducer)

    const {data: group, isFetching} = useGetGroupDetailsQuery(Number(id))
    const [deleteStudent] = useDeleteStudentFromGroupMutation()

    const openConfirmModal = (user_id: number) => {
        onOpen()
        setStudentId(user_id as number)
    }
    
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
                            <AddPersonToTheGroupModule id={id}/>
                        }
                    </Flex>
                  
                    
                    <List persons={group.students} showControl={true} callback={openConfirmModal}/>
                </>
            }
        </>
    )
}