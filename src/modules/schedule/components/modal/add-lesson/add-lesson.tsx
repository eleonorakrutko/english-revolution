import React, { useState, useEffect } from "react"
import { ModalFooter, ModalHeader, ModalBody, Stack, Checkbox, Text, ButtonGroup, Flex } from '@chakra-ui/react'
import { CustomButton, CustomModal } from "../../../../../ui"
import { validate } from "../../../../../helpers"
import styles from './index.module.css'
import { useCreateLessonMutation, useGetGroupsQuery, useGetStudentsQuery } from "../../../api/schedule-api"
import { CustomInput } from "../../../../../components"
import { useInputsForm } from "../../../../../common/hooks/useInputsForm"
import { Person } from "../../../../../types/person"
import { Group } from "../../../../../types/group"
import { useTypedDispatch } from "../../../../../common/hooks/useTypedDispatch"
import { showAlert } from "../../../../layout/store/alert-slice"

type Props = {
  isOpen: boolean, 
  onClose: () => void
}

interface CreateLessonData {
  title: string,
  date_from: string,
  date_to: string,
  online_meeting_link: string,
}

export const AddLessonModal = ({isOpen, onClose}: Props) =>  {
  const [studentInputValue, setStudentInputValue] = useState<string>('')
  const [choosedStudentId, setChoosedStudentId] = useState<number | null>(null)
  const [choosedGroupId, setChoosedGroupId] = useState<number | null>(null)
  const [choosedType, setChoosedType] = useState('student')
  const [inputData, onChangeInputData] = useInputsForm<CreateLessonData>({
    title: '',
    date_from: '',
    date_to: '',
    online_meeting_link: ''
  })

  const dispatch = useTypedDispatch()

  const [createLesson, {isSuccess, isError}] = useCreateLessonMutation()

  const {data: students} = useGetStudentsQuery(studentInputValue)
  const {data: groups} = useGetGroupsQuery('')

  useEffect(() => {
    if(isSuccess){
        dispatch(showAlert({type: 'success', text: 'Lesson was successfully created!',}))
        onClose()
    }
    if(isError){
        dispatch(showAlert({type: 'error', text: 'Failed to create lesson!'}))
        onClose()
    }
}, [isSuccess, isError])

  const createLessonHandler = () => {
    const {title, date_from, date_to, online_meeting_link} = inputData
    if(choosedType === 'student'){
      createLesson({
        "student_id": choosedStudentId,
        title,
        date_from,
        date_to,
        online_meeting_link
      })
    }
    if(choosedType === 'group'){
      createLesson({
          "group_id": choosedGroupId,
          title,
          date_from,
          date_to,
          online_meeting_link
      })
    }
  }

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Add Lesson</ModalHeader>
        <ModalBody>
          <Flex p={2} direction='column'>
            <Text as='b' mb={2}>Title</Text>
            <CustomInput 
              value={inputData.title} 
              name='title'
              minH='50px'
              placeholder='Enter title' 
              onChangeCallback={onChangeInputData}
              validateCallback={() => validate(inputData.title, {minLength: 2})}
            />
          </Flex>

          <ButtonGroup display='flex' justifyContent='center' p={2}>
            <CustomButton 
              text="Student" 
              variant={choosedType === 'student'? 'solid' : 'outline'} 
              callback={() => setChoosedType('student')}
            />
            <CustomButton 
              text="Group" 
              variant={choosedType === 'group'? 'solid' : 'outline'}  
              callback={() => setChoosedType('group')}
            />
          </ButtonGroup>

          {(choosedType === 'student') &&
            <Flex p={2} direction='column'>
              <Text as='b' mb={2}>Student</Text>
              <CustomInput 
                value={studentInputValue}
                minH='50px'
                placeholder='Enter student' 
                onChangeCallback={e => setStudentInputValue(e.target.value)}
                validateCallback={() => validate(studentInputValue, {minLength: 1})}
              />
                {(students && students.length) ?
                  <Stack className={styles.wrapperStudentList} >
                    <Stack className={styles.studentList}>
                      { students.map(({first_name, last_name, user_role_id}: Person) => 
                          <Checkbox 
                            isChecked={choosedStudentId === user_role_id} 
                            onChange={() =>  {
                              setChoosedStudentId(user_role_id)
                              setStudentInputValue(`${first_name} ${last_name}`)
                            }} 
                            colorScheme='purple' 
                            key={user_role_id} 
                            value={user_role_id}>
                              {first_name} {last_name}
                          </Checkbox>
                        )
                      }
                    </Stack>
                  </Stack>
                  :
                  <>
                    {(students && !students.length) && <Text textAlign='center' color='red.500'>User not found</Text>}
                  </>
                } 
              </Flex>
          }

          {(choosedType === 'group') &&
            <>
              {groups.length ? 
                <Stack className={styles.wrapperStudentList} >
                  <Stack className={styles.studentList}>
                    { groups.map(({name, id}: Group) => 
                        <Checkbox 
                          isChecked={choosedGroupId === id} 
                          onChange={() =>  {
                            setChoosedGroupId(id)
                          }} 
                          colorScheme='purple' 
                          key={id} 
                          value={id}>
                            {name}
                        </Checkbox>
                      )
                    }
                  </Stack>
                </Stack>
                :
                <Text textAlign='center' color='red.500'>You don't have groups</Text>
              }
            </>
            
          }
            
          <Flex p={2} direction='column'>
            <Text as='b' mb={2}>Date from</Text>
            <CustomInput 
              value={inputData.date_from}
              name='date_from'
              type="datetime-local"
              minH='50px' 
              onChangeCallback={onChangeInputData}
              validateCallback={() => validate(inputData.date_from, {isBefore: inputData.date_to})} 
            />
          </Flex>
          
          <Flex p={2} direction='column'>
            <Text as='b' mb={2}>Date to</Text>
            <CustomInput 
              value={inputData.date_to}
              name='date_to'
              type="datetime-local" 
              minH='50px'
              onChangeCallback={onChangeInputData}
              validateCallback={() => validate(inputData.date_to, {isAfter: inputData.date_from})}
            />
          </Flex>

          <Flex p={2} direction='column'>
            <Text as='b' mb={2}>Online meeting link</Text>
            <CustomInput 
              value={inputData.online_meeting_link}
              name='online_meeting_link'
              minH='50px'
              onChangeCallback={onChangeInputData}
              />
          </Flex>
          
        </ModalBody>

        <ModalFooter justifyContent='space-between'>
              <CustomButton callback={createLessonHandler} text="Create lesson"/>
              <CustomButton callback={onClose} text='Close' variant="outline"/>
        </ModalFooter>
    </CustomModal>
  )
}