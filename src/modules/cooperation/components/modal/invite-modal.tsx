import { FormControl, FormLabel, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomButton, CustomInput, CustomModal } from "../../../../ui";
import { useSendInviteMutation } from "../../api/cooperation-api";

type Props = {
    onClose: () => void,
    isOpen: boolean,
    user_id: number | null,
}

export const InviteModal = ({onClose, isOpen, user_id}: Props) => {
    const [message, setMessage] = useState('')

    const [ sendInvite ] = useSendInviteMutation()

    const sendInviteHandler = async () => {
        sendInvite({
            "message": message,
            "recipient_id": user_id
        })
        onClose()
    }

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