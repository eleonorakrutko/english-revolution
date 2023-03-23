import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
    bg?: string
}

export const CustomModal = ({isOpen, onClose, children, bg}: Props) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={bg}>
                <ModalCloseButton/>
                {children}
            </ModalContent>
        </Modal>
    )
}