import { Text, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { List } from "../../components";
import { CustomSpinner } from "../../ui";
import { DeleteConfirmModal } from "../../components";
import { useDeleteStudentsMutation, useGetStudentsQuery } from "./api/students-api";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { showAlert } from "../layout/store/alert-slice";

export const StudentListModule = () => {
    const dispatch = useTypedDispatch()

    const [id, setId] = useState<number | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data: students, isFetching} = useGetStudentsQuery('')
    const [ deleteStudents, {isSuccess, isError} ] = useDeleteStudentsMutation()

    useEffect(() => {
      if(isSuccess){
          dispatch(showAlert({type: 'success', text: 'Student was successfully deleted',}))
          onClose()
      }
      if(isError){
          dispatch(showAlert({type: 'error', text: 'Failed to delete student'}))
          onClose()
      }
    }, [isSuccess, isError])

    const openConfirmModal = (id: number) => {
        setId(id)
        onOpen()
    }

    return(
        <>
            <Text fontSize='2xl'>Students List</Text>
            {isFetching?
                <CustomSpinner/>
                :
                <>
                    {isOpen && 
                        <DeleteConfirmModal 
                            typeName='student'
                            deleteCallback={() => deleteStudents(id)}
                            isOpen={isOpen} 
                            onClose={onClose}
                        />
                    }
                    <List 
                        persons={students}
                        showControl={true} 
                        callback={openConfirmModal}
                    />
                </>
                
            }
        </>
    )
}