import { ButtonGroup, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetGroupsQuery } from "../../../modules/group-list/api/group-api";
import { useGetStudentsQuery } from "../../../modules/student-list/api/students-api";
import { CustomButton, CustomSpinner } from "../../../ui";
import { useAssignGroupToTeacherMutation, useAssignStudentsToTeacherMutation } from "../api/assign-api";
import { useGetTeachersQuery } from "../api/teachers-api";
import { AssignConfirmModal } from "../components/modal/assign-confirm-modal";
import { MultiplyAssignList } from "../components/multiply-assign-list";
import { SingleAssignList } from "../components/single-assign-list";


export const AssignModule = () => {
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [selectedStudentsIds, setSelectedStudentsIds] = useState<number[]>([])

    const {isOpen, onClose, onOpen} = useDisclosure()

    const {data: teachers, isFetching} = useGetTeachersQuery('')
    const {data: groups, isFetching: isFetchingGroups} = useGetGroupsQuery('')
    const {data: students, isFetching: isFetchingStudents} = useGetStudentsQuery('')

    const [ assignGroup ] = useAssignGroupToTeacherMutation()
    const [ assignStudents ] = useAssignStudentsToTeacherMutation()
    const [type, setType] = useState('students')

    const onCheckedMultiplyHandler = (id: number, checked: boolean) => {
        if(checked){
            setSelectedStudentsIds([...selectedStudentsIds, id])
            return
        }
        setSelectedStudentsIds(selectedStudentsIds.filter((currentId) => currentId !== id))
    }

    const onCheckTeacherHandler = (id: number | null) => {
        setSelectedTeacherId(id)
    }

    const onCheckGroupHandler = (id: number | null) => {
        setSelectedGroupId(id)
    }

    const assignHandler = () => {
        if(type === 'groups'){
            assignGroup({group_id: selectedGroupId, teacher_id: selectedTeacherId})
        }
        if(type === 'students'){
            assignStudents({
                "student_ids": selectedStudentsIds,
                "teacher_id": selectedTeacherId
            })
        }
    }
 
    return(
        <>  
                    {isOpen && 
                        <AssignConfirmModal 
                            assignCallback={() => assignHandler()}
                            isOpen={isOpen} 
                            onClose={onClose}
                        />
                    }
        <Flex justify='center' mb={3}>
            <CustomButton text="Assign" size="lg" colorSheme="whatsapp" callback={onOpen}/>
        </Flex>

        <Flex justify='space-around'>
            <Flex direction='column' w='45%'>
                <Text fontSize='2xl' as='b' h='48px'>Teachers</Text>
                {isFetching? 
                    <CustomSpinner/>
                    :
                    <SingleAssignList persons={teachers} selectedId={selectedTeacherId} callback={onCheckTeacherHandler}/>
                }
            </Flex>


            <Flex w='45%' direction='column'>

                <ButtonGroup display='flex' justifyContent='center'>
                    <CustomButton text="Students" callback={() => setType('students')}/>
                    <CustomButton text="Groups" callback={() => setType('groups')}/>
                </ButtonGroup>
                
                {(type === 'students') &&
                    <>
                        {isFetchingStudents? 
                            <CustomSpinner/>
                            :
                            <MultiplyAssignList persons={students} selectedIds={selectedStudentsIds} callback={onCheckedMultiplyHandler}/>
                        }
                    </>
                }
                
                {(type === 'groups') && 
                    <>
                        {isFetchingGroups? 
                            <CustomSpinner/>
                            :
                            <SingleAssignList groups={groups} selectedId={selectedGroupId} callback={onCheckGroupHandler}/>
                        }
                    </>
                }
            </Flex>
            
            
        </Flex>
            
            
        </>
    )
}