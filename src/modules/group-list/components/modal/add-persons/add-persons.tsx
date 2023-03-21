import { Checkbox, FormControl, FormLabel, ModalBody, ModalFooter, ModalHeader, Stack, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTypedDispatch } from "../../../../../common/hooks/useTypedDispatch";
import { CustomInput } from "../../../../../components";
import { validate } from "../../../../../helpers";
import { Person } from "../../../../../types/person";
import { CustomButton, CustomModal } from "../../../../../ui";
import { showAlert } from "../../../../layout/store/alert-slice";
import { useAddPersonToTheGroupMutation, useGetStudentsQuery } from "../../../api/group-api";
import styles from './index.module.css'

type Props = {
    isOpen: boolean,
    onClose: () => void,
    id: string | undefined,
}

export const AddPersonModal = ({isOpen, onClose, id}: Props) => {
    const [studentInputValue, setStudentInputValue] = useState<string>('')
    const [choosedStudentId, setChoosedStudentId] = useState<number | null>(null)
    const dispatch = useTypedDispatch()

    const { data: students } = useGetStudentsQuery(studentInputValue, {})
    const [ addPerson, {isError, isSuccess} ] = useAddPersonToTheGroupMutation()
    
    const addPersonHandler = async () => {
      addPerson({id, choosedStudentId})
    }

    useEffect(() => {
      if(isSuccess){
          dispatch(showAlert({type: 'success', text: 'Student was successfully added!',}))
          onClose()
      }
      if(isError){
          dispatch(showAlert({type: 'error', text: 'Failed to add student!'}))
          onClose()
      }
    }, [isSuccess, isError])

    return(
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Add persons to the group</ModalHeader>

            <ModalBody mb={4}>
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
                      <Stack className={styles.wrapperStudentList}>
                        <Stack className={styles.studentList}>
                          { students?.map(({first_name, last_name, user_role_id}: Person) => 
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

              {isError && <Text textAlign='center' mt={2} color='red.500'>eerrror</Text>}
            
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-between'>
                <CustomButton text="Add person" callback={addPersonHandler} disabled={!choosedStudentId}/>
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}