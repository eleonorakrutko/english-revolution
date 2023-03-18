import { Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { List } from "../../components";
import { CustomSpinner } from "../../ui";
import { DeleteConfirmModal } from "../../components";
import { useDeleteStudentsMutation, useGetStudentsQuery } from "./api/students-api";

export const StudentListModule = () => {
    const {data: students, isFetching} = useGetStudentsQuery('')
    const [ deleteStudents ] = useDeleteStudentsMutation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setId] = useState<number | null>(null)

    const openConfirmModal = (id: number) => {
        setId(id)
        onOpen()
    }

    console.log(students)
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