import { ModalFooter, ModalHeader} from '@chakra-ui/react'
import React from 'react'
import { RequestForCooperationStatus } from '../../../../types/request-for-cooperation-status'
import { CustomButton, CustomModal } from '../../../../ui'
import { useMakeDecisionMutation } from '../../api/cooperation-api'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    id: number | null,
    status: RequestForCooperationStatus | string,
}

export const ConfirmModal = ({ onClose, isOpen, id, status }: Props) => {
    const [makeDecision] = useMakeDecisionMutation()

    const makeDecisionHandler = async () => {
        makeDecision({
            id,
            status
        })
        onClose()
    }

    return(
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Confirm your desicion</ModalHeader>

            <ModalFooter display='flex' justifyContent='space-between'>
                <CustomButton 
                    text={`${status === RequestForCooperationStatus.APPROVED ? 'Approve' : 'Reject'}`} 
                    callback={makeDecisionHandler}
                />
                <CustomButton text="Close" variant="outline" callback={onClose}/>
            </ModalFooter>
        </CustomModal>
    )
}