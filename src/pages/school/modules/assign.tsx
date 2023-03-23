import { ButtonGroup, Flex, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch"; 
import { showAlert } from "../../../modules/layout/store/alert-slice";
import { CustomButton, CustomSpinner } from "../../../ui";
import { useAssignGroupToTeacherMutation, useAssignStudentsToTeacherMutation, useGetGroupForAssignQuery, useGetStudentForAssignQuery } from "../api/assign-api";
import { useGetTeachersQuery } from "../api/teachers-api";
import { AssignConfirmModal } from "../components/modal/assign-confirm-modal";
import { MultiplyAssignList } from "../components/multiply-assign-list";
import { SingleAssignList } from "../components/single-assign-list";


export const AssignModule = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    const dispatch = useTypedDispatch()
    
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [selectedStudentsIds, setSelectedStudentsIds] = useState<number[]>([])
    const [type, setType] = useState<string>('students')

    const {isOpen, onClose, onOpen} = useDisclosure()

    const {data: teachers, isFetching} = useGetTeachersQuery('')
    const {data: groups, isFetching: isFetchingGroups} = useGetGroupForAssignQuery(selectedTeacherId, {
        skip: !selectedTeacherId
    })
    const {data: students, isFetching: isFetchingStudents} = useGetStudentForAssignQuery(selectedTeacherId, {
        skip: !selectedTeacherId
    })

    const [ assignGroup, {isSuccess: isSuccessAssignGroup, isError: isErrorAssignGroup} ] = useAssignGroupToTeacherMutation()
    const [ assignStudents, {isSuccess: isSuccessAssignStudents, isError: isErrorAssignStudents} ] = useAssignStudentsToTeacherMutation()
 
    useEffect(() => {
        if(type === 'students'){
            setSelectedStudentsIds([])
        }
        if(type === 'groups'){
            setSelectedGroupId(null)
        }
    }, [type])

    useEffect(() => {
        if(isSuccessAssignGroup){
            dispatch(showAlert({type: 'success', text: 'Assigning teacher to group was successfully completed!',}))
            onClose()
            setSelectedTeacherId(null)
            setSelectedGroupId(null)
        }
        if(isErrorAssignGroup){
            dispatch(showAlert({type: 'error', text: 'Failed assign teacher to group!'}))
            onClose()
            setSelectedTeacherId(null)
            setSelectedGroupId(null)
        }
    }, [isSuccessAssignGroup, isErrorAssignGroup])

    useEffect(() => {
        
        if(isSuccessAssignStudents){
            dispatch(showAlert({type: 'success', text: 'Assigning teacher to students was successfully completed!',}))
            onClose()
            setSelectedTeacherId(null)
            setSelectedStudentsIds([])
        }
        
        if(isErrorAssignStudents){
            dispatch(showAlert({type: 'error', text: 'Failed assign teacher to students!'}))
            onClose()
            setSelectedTeacherId(null)
            setSelectedStudentsIds([])
        }
    }, [isSuccessAssignStudents, isErrorAssignStudents])

    const onCheckedMultiplyHandler = (id: number, checked: boolean) => {
        if(checked && selectedStudentsIds){
            setSelectedStudentsIds([...selectedStudentsIds, id])
            return
        }
        if(selectedStudentsIds){
            setSelectedStudentsIds(selectedStudentsIds.filter((currentId) => currentId !== id))
        }
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

            <Flex justify='space-around' direction={isLargerThan426? 'row' : 'column' }>
                <Flex direction='column' w={isLargerThan426? '45%' : '100%'}>
                    <Text fontSize='2xl' as='b' h='48px'>Teachers</Text>
                    {isFetching? 
                        <CustomSpinner/>
                        :
                        <SingleAssignList persons={teachers} selectedId={selectedTeacherId} callback={onCheckTeacherHandler}/>
                    }
                </Flex>


                <Flex w={isLargerThan426? '45%' : '100%'} direction='column'>
                    
                    <ButtonGroup display='flex' justifyContent='center'>
                        <CustomButton 
                            text="Students" 
                            variant={type === 'students'? 'solid' : 'outline'} 
                            callback={() => setType('students')}
                        />
                        <CustomButton 
                            text="Groups" 
                            variant={type === 'groups'? 'solid' : 'outline'} 
                            callback={() => setType('groups')}
                        />
                    </ButtonGroup>
                    
                    {(type === 'students') &&
                        <>
                            {isFetchingStudents? 
                                <CustomSpinner/>
                                :
                                <>
                                {selectedTeacherId &&
                                    <MultiplyAssignList 
                                        persons={students} 
                                        selectedIds={selectedStudentsIds} 
                                        callback={onCheckedMultiplyHandler}
                                    />
                                }
                                </>
                            }
                        </>
                    }
                    
                    {(type === 'groups') && 
                        <>
                            {isFetchingGroups? 
                                <CustomSpinner/>
                                :
                                <>
                                    {selectedTeacherId &&
                                        <SingleAssignList 
                                            groups={groups} 
                                            selectedId={selectedGroupId} 
                                            callback={onCheckGroupHandler}
                                        />
                                    }
                                </>
                                
                            }
                        </>
                    }
                </Flex>
            </Flex>   
        </>
    )
}