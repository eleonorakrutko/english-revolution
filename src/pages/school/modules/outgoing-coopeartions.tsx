import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { RequestForCooperationStatus } from "../../../types/request-for-cooperation-status";
import { CustomButtonGroupCooperations, CustomSpinner } from "../../../ui";
import { useGetOutgoingCooperationsQuery } from "../api/cooperations-api";
import { ListOutgoingCooperations } from "../components/list-outgoing-cooperations";

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
            <CustomButtonGroupCooperations cooperationsStatus={cooperationsStatus} callback={setCooperationsStatusHandler}/>
            
            {isFetchingOutgoingCooperations?
                <CustomSpinner/>
                :
                <ListOutgoingCooperations cooperations={outgoingCooperations}/>
            }
        </>
    )
}