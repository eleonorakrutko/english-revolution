import React, { useState, useEffect } from "react";
import { ModalBody, ModalFooter, ModalHeader, Text, FormControl, FormLabel,} from "@chakra-ui/react";
import { CustomButton, CustomModal } from "../../../../../ui";
import { validate } from "../../../../../helpers";
import { useCreateGroupMutation } from "../../../api/group-api";
import { CustomInput } from "../../../../../components";
import { useTypedDispatch } from "../../../../../common/hooks/useTypedDispatch";
import { showAlert } from "../../../../layout/store/alert-slice";

type Props = {
    onClose: () => void,
    isOpen: boolean,
}

export const CreateGroupModal = ({onClose, isOpen}: Props) => {
    const [groupName, setGroupName] = useState<string>('')
    const dispatch = useTypedDispatch()

    const [ createGroup, {isSuccess, isError} ] = useCreateGroupMutation()
   
    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Group was successfully created',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to create group'}))
            onClose()
        }
    }, [isSuccess, isError])

    const createGroupHandler = async () => {
        createGroup(groupName)
        setGroupName('')
    }

    return(
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Create group</ModalHeader>

            <ModalBody mb={1}>
                <FormControl pt={3}>
                    <FormLabel pb={2}>
                    <Text as='b'>Group name:</Text>
                    </FormLabel>
                    <CustomInput 
                        value={groupName}
                        placeholder='Enter group name'
                        onChangeCallback={(e) => setGroupName(e.target.value)} 
                        validateCallback={() => validate(groupName, {minLength: 2})}
                    />
                </FormControl>    
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-between'>
                <CustomButton text='Create' disabled={groupName.length < 2} callback={createGroupHandler}/>
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}