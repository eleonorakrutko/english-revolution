import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

export const CustomModal = ({isOpen, onClose, children}: Props) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton/>
                {children}
            </ModalContent>
        </Modal>
    )
}