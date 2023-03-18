import { ButtonGroup, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetOutgoingCooperationsQuery } from "../../../../modules/cooperation/api/cooperation-api";
import { RequestForCooperationStatus } from "../../../../types/request-for-cooperation-status";
import { CustomButton, CustomSpinner } from "../../../../ui";
import { ListOutgoingCooperations } from "../../components/list-outgoing-cooperations";

export const OutgoingCooperationsModule = () => {
    const [cooperationsStatus, setCooperationsStatus] = useState<RequestForCooperationStatus>(RequestForCooperationStatus.PENDING)

    const {
        data: outgoingCooperations, 
        isFetching: isFetchingOutgoingCooperations
    } = useGetOutgoingCooperationsQuery(`status=${cooperationsStatus}`)

    const setCooperationsStatusHandler = (status: RequestForCooperationStatus) => {
        setCooperationsStatus(status)
    }
    return (
        <>
            <Text fontSize='2xl'>Outgoing Cooperations</Text>
            <ButtonGroup display='flex' justifyContent='center' mb={8}>
                <CustomButton 
                    text={`${RequestForCooperationStatus.PENDING}`} 
                    callback={() => setCooperationsStatusHandler(RequestForCooperationStatus.PENDING)}
                />
                <CustomButton 
                    text={`${RequestForCooperationStatus.APPROVED}`} 
                    colorSheme='whatsapp'
                    callback={() => setCooperationsStatusHandler(RequestForCooperationStatus.APPROVED)}
                />
                <CustomButton 
                    text={`${RequestForCooperationStatus.REJECTED}`} 
                    colorSheme='red'
                    callback={() => setCooperationsStatusHandler(RequestForCooperationStatus.REJECTED)}
                /> 
            </ButtonGroup>
            {isFetchingOutgoingCooperations?
                <CustomSpinner/>
                :
                <ListOutgoingCooperations cooperations={outgoingCooperations}/>
            }
        </>
    )
}