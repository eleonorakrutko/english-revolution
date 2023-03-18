import { ButtonGroup, Flex, Text, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { RequestForCooperationStatus } from "../../types/request-for-cooperation-status";
import { CustomButton, CustomSpinner } from "../../ui";
import { useGetIncomingCooperationsQuery } from "./api/cooperation-api"; 
import { ConfirmModal } from "./components/modal/confirm"; 

type Props = {
    created_at: string, 
    email: string, 
    first_name: string,
    from: string,
    id: number,
    last_name: string,
    message: string,
    status: string, 
    username: string,
}

export const CooperationModule = () => {
    const [choosedStatus, setChoosedStatus] = useState('')
    const [choosedId, setChoosedId] = useState<number | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [cooperationsStatus, setCooperationsStatus] = useState<RequestForCooperationStatus>(RequestForCooperationStatus.PENDING)
    const setCooperationsStatusHandler = (status: RequestForCooperationStatus) => {
        setCooperationsStatus(status)
    }

    const {data: incomingCooperations, isFetching} = useGetIncomingCooperationsQuery(`status=${cooperationsStatus}`)

    const openConfirmModal =  (id: number, status: RequestForCooperationStatus) => {
        setChoosedStatus(status)
        setChoosedId(id)
        onOpen()
    }

    return(
        <>
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
        {isFetching?
            <CustomSpinner/>
            :
            <>
                {isOpen && 
                    <ConfirmModal isOpen={isOpen} onClose={onClose} id={choosedId} status={choosedStatus}/>
                }

                {incomingCooperations?
                    <>
                        {incomingCooperations.map(({first_name, last_name, from, email, created_at, message, username, id, status}: Props) => 
                            <Flex 
                                m='10px 0' 
                                key={id} 
                                bg='white' 
                                align='center' 
                                p={3} 
                                borderRadius='30px' 
                                border='2px solid #B794F4' 
                                justify='space-between'
                            >
                                <Flex align='center'>
                                    <Flex direction='column' ml={4}>
                                        <Flex align='center'>
                                            <Text fontSize='xl' as='b' color='black'>{last_name} {first_name}</Text>
                                            <Text ml={4}>from: {from}</Text>
                                        </Flex>
                                        
                                        <Text>{message}</Text>
                                        <Flex mt={1} fontSize='sm' as='b'>
                                            <Text color='purple.600'>{username}</Text>
                                            <Text ml={2}>{email}</Text>
                                        </Flex> 
                                        <Text mt={2}>{moment(created_at).format('MMMM, DD HH:mm')}</Text>
                                    </Flex>
                                </Flex>

                                {status === RequestForCooperationStatus.PENDING &&
                                    <Flex direction='column' align='center'>
                                        <CustomButton 
                                            m={1} 
                                            borderRadius='20px' 
                                            text="Approve" 
                                            colorSheme="whatsapp" 
                                            callback={() => openConfirmModal(id, RequestForCooperationStatus.APPROVED)}
                                        />
                                        <CustomButton 
                                            m={1} 
                                            borderRadius='20px' 
                                            text="Reject" 
                                            colorSheme="red"
                                            callback={() => openConfirmModal(id, RequestForCooperationStatus.REJECTED)}
                                        />
                                    </Flex>
                                }

                                {status === RequestForCooperationStatus.APPROVED && 
                                    <Text color='green.400' as='b'>APROVED</Text>
                                }
                                {status === RequestForCooperationStatus.REJECTED && 
                                    <Text color='red.400' as='b'>REJECTED</Text>
                                }
                            </Flex>
                        )}
                    </>
                    :
                    <Text fontSize='2xl'>You don't have incoming cooperations</Text>
                }
            </>
        }
            
        </>
    )
}