import { Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteConfirmModal, List } from "../../components";
import { CustomSpinner } from "../../ui";
import { useDeleteTeachersMutation, useGetTeachersQuery } from "./api/teachers-api";

export const TeachersList = () => {
    const {data: teachers, isFetching} = useGetTeachersQuery('')
    const [ deleteTeachers ] = useDeleteTeachersMutation()
    const [id, setId] = useState<number | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const openConfirmModal = (id: number) => {
        setId(id)
        onOpen()
    }

    console.log(teachers)
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
                    <List persons={teachers} showControl={true} callback={openConfirmModal}/>
                </>
            }
        </>
    )
}