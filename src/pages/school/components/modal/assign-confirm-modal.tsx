import { ModalBody, ModalFooter, ModalHeader, Text} from "@chakra-ui/react";
import React from "react";
import { CustomButton, CustomModal } from "../../../../ui"

type Props = {
    onClose: () => void,
    isOpen: boolean,
    assignCallback: () => void,
}

export const AssignConfirmModal = ({ onClose, isOpen, assignCallback }: Props) => {
    const assignHandler = () => {
        assignCallback()
        onClose()
    }

    return(
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Assign</ModalHeader>

            <ModalBody mb={4}>
                <Text>Are you sure? </Text>
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-between'>
                <CustomButton text="Assign" callback={assignHandler} colorSheme='whatsapp'/>
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}