import { Flex, Link, ModalBody, ModalFooter, ModalHeader, Text } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { RolesEnum } from "../../../../../types/roles-enum";
import { CustomButton, CustomModal, CustomSpinner } from "../../../../../ui";
import moment from 'moment'
import { useDeleteLessonMutation, useGetLessonDetailsQuery } from "../../../api/schedule-api";
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector";
import { showAlert } from "../../../../layout/store/alert-slice";
import { useTypedDispatch } from "../../../../../common/hooks/useTypedDispatch";

type Props = {
    isOpen: boolean, 
    onClose: () => void,
    id: number | null,
}

export const LessonDetailModal = ({isOpen, onClose, id}: Props) => {
    const { user } = useTypedSelector(state => state.authReducer)

    const {data: lessonDetails, isFetching} = useGetLessonDetailsQuery(id)

    const [deleteLesson , {isSuccess, isError}] = useDeleteLessonMutation()
    const dispatch = useTypedDispatch()

    const deleteLessonHandler = async () => {
        deleteLesson(id)
    } 

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Lesson was successfully deleted!',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to delete lesson!'}))
            onClose()
        }
    }, [isSuccess, isError])

    return(
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Lesson detail</ModalHeader>
            {isFetching?
                <CustomSpinner/>
                :
                <ModalBody>
                    {lessonDetails &&
                        <Flex direction='column'>
                            <Flex p={2} fontSize='lg'>
                                <Text as='b'>Title:</Text>
                                <Text ml={2}>{lessonDetails.title}</Text>
                            </Flex>

                            {(lessonDetails.student_name && lessonDetails.student_email) &&
                                <Flex direction='column' p={2}>
                                    <Flex fontSize='lg'>
                                        <Text as='b'>Student:</Text>
                                        <Text ml={2}>{lessonDetails.student_name}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text as='b'>Email:</Text>
                                        <Text ml={2} color='purple.600'>{lessonDetails.student_email}</Text>
                                    </Flex>
                                </Flex>
                            }

                            {(lessonDetails.group_name && lessonDetails.group) &&
                                <Flex fontSize='lg' p={2}>
                                    <Text as='b'>Group:</Text>
                                    <Text ml={2}>{lessonDetails.group_name}</Text>
                                </Flex>
                            }
                            
                            <Flex direction='column' p={2} >
                                <Flex fontSize='lg'>
                                    <Text  as='b'>Teacher:</Text>
                                    <Text ml={2} >{lessonDetails.teacher_name}</Text>
                                </Flex>
                                <Flex>
                                    <Text as='b'>Email:</Text>
                                    <Text ml={2} color='purple.600'>{lessonDetails.teacher_email}</Text>
                                </Flex>
                            </Flex>

                            <Flex direction='column' p={2} fontSize='lg'>
                                <Flex>
                                    <Text as='b'>Date:</Text>
                                    <Text ml={2}>{moment(lessonDetails.date_from).format('MMMM, DD')}</Text>
                                </Flex>
                                <Flex>
                                    <Text as='b'>Time:</Text>
                                    <Text ml={2}>
                                        {moment(lessonDetails.date_from).format('HH:mm')}
                                        -
                                        {moment(lessonDetails.date_to).format('HH:mm')}
                                    </Text>
                                </Flex>
                            </Flex>

                            {lessonDetails.online_meeting_link && 
                                <Flex fontSize='lg' p={2}>
                                    <Text as='b'>Online meeting link:</Text>
                                    <Link href='https://www.google.com/' ml={2}>{lessonDetails.online_meeting_link}</Link>
                                </Flex>
                            }
        
                        </Flex>
                    }
                </ModalBody>
            }
            

            <ModalFooter>
                <Flex justify='space-between' w='100%'>
                {user?.role_type !== RolesEnum.STUDENT && 
                    <CustomButton 
                        text="Delete" 
                        colorSheme="red"
                        callback={deleteLessonHandler}
                        p={5}
                    />
                }
                
                <CustomButton 
                    text="Close" 
                    variant="outline"
                    callback={onClose}
                    p={5}
                />
                </Flex>
                
            </ModalFooter>
      </CustomModal>
    )
}