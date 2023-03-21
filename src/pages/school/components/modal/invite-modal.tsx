import { FormControl, FormLabel, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTypedDispatch } from "../../../../common/hooks/useTypedDispatch";
import { CustomInput } from "../../../../components";
import { showAlert } from "../../../../modules/layout/store/alert-slice";
import { CustomButton, CustomModal } from "../../../../ui";
import { useSendInviteMutation } from "../../api/cooperations-api"; 

type Props = {
    onClose: () => void,
    isOpen: boolean,
    user_id: number | null,
}

export const InviteModal = ({onClose, isOpen, user_id}: Props) => {
    const [message, setMessage] = useState<string>('')
    const dispatch = useTypedDispatch()
    const [ sendInvite, {isSuccess, isError} ] = useSendInviteMutation()

    const sendInviteHandler = async () => {
        sendInvite({
            "message": message,
            "recipient_id": user_id
        })
    }

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Request for cooperation was successfully sent!',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to send request for cooperation!'}))
            onClose()
        }
      }, [isSuccess, isError])

    return(
        <CustomModal onClose={onClose} isOpen={isOpen}>
            <ModalHeader>Invite for cooperation</ModalHeader>
    
            <ModalBody >
                <FormControl p={2}>
                    <FormLabel>Message:</FormLabel>
                    <CustomInput value={message} placeholder='Enter message' onChangeCallback={e => setMessage(e.target.value)}/>
                </FormControl>
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-between' pt={0}>
                <CustomButton text="Send invite" variant="solid" colorSheme="whatsapp" callback={sendInviteHandler}/>
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}