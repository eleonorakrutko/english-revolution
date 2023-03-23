import { Text, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { DeleteConfirmModal, List } from "../../../components";
import { showAlert } from "../../../modules/layout/store/alert-slice";
import { CustomSpinner } from "../../../ui";
import { useDeleteTeachersMutation, useGetTeachersQuery } from "../api/teachers-api";

export const TeachersListModule = () => {
    const dispatch = useTypedDispatch()

    const [id, setId] = useState<number | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {data: teachers, isFetching} = useGetTeachersQuery('')
    const [ deleteTeachers, {isSuccess, isError} ] = useDeleteTeachersMutation()

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Teacher was successfully deleted',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to delete teacher'}))
            onClose()
        }
    }, [isSuccess, isError])

    const openConfirmModal = (id: number) => {
        setId(id)
        onOpen()
    }

    return(
        <>
            <Text fontSize='2xl'>Teachers List</Text>
            {isFetching?
                <CustomSpinner/>
                :
                <>
                    {isOpen && 
                        <DeleteConfirmModal 
                            typeName='teacher'
                            deleteCallback={() => deleteTeachers(id)}
                            isOpen={isOpen} 
                            onClose={onClose}
                        />
                    }
                    <List persons={teachers} showControl={true} showTeacherDetails={true} callback={openConfirmModal}/>
                </>
            }
        </>
    )
}