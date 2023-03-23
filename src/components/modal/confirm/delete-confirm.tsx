import { ModalBody, ModalFooter, ModalHeader, Text} from "@chakra-ui/react";
import React from "react";
import { CustomButton, CustomModal } from "../../../ui"

type Props = {
    onClose: () => void,
    isOpen: boolean,
    typeName: string,
    deleteCallback: () => void,
}

export const DeleteConfirmModal = ({ onClose, isOpen, deleteCallback, typeName }: Props) => {
    
    const deleteHandler = () => {
        deleteCallback()
        onClose()
    }

    return(
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Delete {typeName}</ModalHeader>

            <ModalBody mb={4}>
                <Text>Do you really want delete this {typeName}?</Text>
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-between'>
                <CustomButton text="Delete" callback={deleteHandler}/>
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}