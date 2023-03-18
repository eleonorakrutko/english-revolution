import React, { useState } from "react"
import { ModalFooter, ModalHeader, ModalBody, FormControl, FormLabel, Stack, Checkbox, Text, ButtonGroup } from '@chakra-ui/react'
import { CustomButton, CustomInput, CustomModal } from "../../../../../ui"
import { validate } from "../../../../../helpers"
import styles from './index.module.css'
import { useCreateLessonMutation, useGetGroupsQuery, useGetStudentsQuery } from "../../../api/schedule-api"

type Props = {isOpen: boolean, onClose: () => void}

export const AddLessonModal = ({isOpen, onClose}: Props) =>  {
  const [studentInputValue, setStudentInputValue] = useState('')
  const [choosedStudentId, setChoosedStudentId] = useState('')
  const [title, setTitle] = useState('')
  const [date_from, setDateFrom] = useState('')
  const [date_to, setDateTo] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [choosedType, setChoosedType] = useState('')
  const [choosedGroupId, setChoosedGroupId] = useState('')

  const [createLesson] = useCreateLessonMutation()
  const {data: students} = useGetStudentsQuery(studentInputValue)
  const {data: groups} = useGetGroupsQuery('')

  const createLessonHandler = () => {
    if(choosedType && choosedType === 'student'){
      createLesson({
        "student_id": Number(choosedStudentId),
        "title": title,
        "date_from": date_from,
        "date_to": date_to,
        "online_meeting_link": meetingLink
      })
      onClose()
    }
    if(choosedType && choosedType === 'group'){
      createLesson({
          "group_id": Number(choosedGroupId),
          "title": title,
          "date_from": date_from,
          "date_to": date_to,
          "online_meeting_link": meetingLink
      })
      onClose()
    }
  }

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Add Lesson</ModalHeader>
        <ModalBody>
          <FormControl p={2}>
            <FormLabel>Title</FormLabel>
            <CustomInput 
              value={title} 
              minH='50px'
              placeholder='Enter title' 
              onChangeCallback={e => setTitle(e.target.value)}
              validateCallback={() => validate(title, {minLength: 2})}
            />
          </FormControl>

          <ButtonGroup display='flex' justifyContent='center' p={2}>
            <CustomButton text="Student" variant="outline" callback={() => setChoosedType('student')}/>
            <CustomButton text="Group" variant="outline" callback={() => setChoosedType('group')}/>
          </ButtonGroup>
          {(choosedType && choosedType === 'student') &&
            <FormControl p={2}>
              <FormLabel>Student</FormLabel>
              <CustomInput 
                value={studentInputValue}
                minH='50px'
                placeholder='Enter student' 
                onChangeCallback={e => setStudentInputValue(e.target.value)}
                validateCallback={() => validate(studentInputValue, {minLength: 1})}
              />
              { (students && students.length) ?
                <Stack className={styles.wrapperStudentList} >
                  <Stack className={styles.studentList}>
                    { students.map(({first_name, last_name, user_role_id}: any) => 
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
            </FormControl>
          }

          {(choosedType && choosedType === 'group') &&
            <Stack className={styles.wrapperStudentList} >
            <Stack className={styles.studentList}>
              { groups?.map(({name, id}: any) => 
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
          }
            
          <FormControl p={2}>
            <FormLabel>Date from</FormLabel>
            <CustomInput 
              value={date_from}
              type="datetime-local"
              minH='50px' 
              onChangeCallback={e => setDateFrom(e.target.value)}
              validateCallback={() => validate(date_from, {isBefore: date_to})} 
            />
          </FormControl>
          
          <FormControl p={2}>
            <FormLabel>Date to</FormLabel>
            <CustomInput 
              value={date_to}
              type="datetime-local" 
              minH='50px'
              onChangeCallback={e => setDateTo(e.target.value)}
              validateCallback={() => validate(date_to, {isAfter: date_from})}
            />
          </FormControl>

          <FormControl p={2}>
            <FormLabel>Online meeting link</FormLabel>
            <CustomInput 
              value={meetingLink}
              minH='50px'
              onChangeCallback={e => setMeetingLink(e.target.value)}
              />
          </FormControl>
          
        </ModalBody>

        <ModalFooter justifyContent='space-between'>
              <CustomButton callback={createLessonHandler} text="Create lesson"/>
              <CustomButton callback={onClose} text='Close' variant="outline"/>
        </ModalFooter>
    </CustomModal>
  )
}