import { ButtonGroup, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { RequestForCooperationStatus } from "../../types/request-for-cooperation-status";
import { CustomButton } from "../button";

type Props = {
    cooperationsStatus: RequestForCooperationStatus,
    callback: (status: RequestForCooperationStatus) => void
}

export const CustomButtonGroupCooperations = ({cooperationsStatus, callback}: Props) =>{
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    return (
        <ButtonGroup display='flex' justifyContent='center' mb={8}>
            <CustomButton 
                size={isLargerThan426? 'lg' : 'xs'}
                text={`${RequestForCooperationStatus.PENDING}`} 
                variant={cooperationsStatus === RequestForCooperationStatus.PENDING? 'solid' : 'outline'}
                callback={() => callback(RequestForCooperationStatus.PENDING)}
            />
            <CustomButton 
                size={isLargerThan426? 'lg' : 'xs'}
                text={`${RequestForCooperationStatus.APPROVED}`}
                variant={cooperationsStatus === RequestForCooperationStatus.APPROVED? 'solid' : 'outline'} 
                colorSheme='whatsapp'
                callback={() => callback(RequestForCooperationStatus.APPROVED)}
            />
            <CustomButton 
                size={isLargerThan426? 'lg' : 'xs'}
                text={`${RequestForCooperationStatus.REJECTED}`} 
                variant={cooperationsStatus === RequestForCooperationStatus.REJECTED? 'solid' : 'outline'}
                colorSheme='red'
                callback={() => callback(RequestForCooperationStatus.REJECTED)}
            /> 
        </ButtonGroup>
    )
}