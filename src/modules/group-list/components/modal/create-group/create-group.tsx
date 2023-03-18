import React, { useState } from "react";
import { ModalBody, ModalFooter, ModalHeader, Text, FormControl, FormLabel,} from "@chakra-ui/react";
import { CustomButton, CustomInput, CustomModal } from "../../../../../ui";
import { validate } from "../../../../../helpers";
import { useCreateGroupMutation } from "../../../api/group-api";

type Props = {
    onClose: () => void,
    isOpen: boolean,
}

export const CreateGroupModal = ({onClose, isOpen}: Props) => {
    const [groupName, setGroupName] = useState('')

    const [ createGroup ] = useCreateGroupMutation()
   
    const createGroupHandler = async () => {
        createGroup({
            "name": groupName
        })
        setGroupName('')
        onClose()
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
                <CustomButton text='Create' callback={createGroupHandler}/>
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}