import { ModalFooter, ModalHeader} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { useTypedDispatch } from '../../../../hooks/useTypedDispatch'
import { RequestForCooperationStatus } from '../../../../types/request-for-cooperation-status'
import { CustomButton, CustomModal } from '../../../../ui'
import { showAlert } from '../../../layout/store/alert-slice'
import { useMakeDecisionMutation } from '../../api/cooperations-api'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    id: number | null,
    status: RequestForCooperationStatus | string,
}

export const DecisionConfirmModal = ({ onClose, isOpen, id, status }: Props) => {
    const [ makeDecision, {isSuccess, isError} ] = useMakeDecisionMutation()
    const dispatch = useTypedDispatch()

    const makeDecisionHandler = () => {
        makeDecision({
            id,
            status
        })
    }

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: `Request for cooperation was successfully ${status.toLowerCase()}!`}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to make decision'}))
            onClose()
        }
    }, [isSuccess, isError])

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