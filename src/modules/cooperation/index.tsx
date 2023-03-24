import { Flex, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { Cooperations } from "../../types/cooperations";
import { RequestForCooperationStatus } from "../../types/request-for-cooperation-status";
import { CustomButton, CustomButtonGroupCooperations, CustomSpinner } from "../../ui";
import { useGetIncomingCooperationsQuery } from "./api/cooperations-api"; 
import { DecisionConfirmModal } from "./components/modal/decision-confirm"; 

export const CooperationModule = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    const [choosedStatus, setChoosedStatus] = useState<string>('')
    const [choosedId, setChoosedId] = useState<number | null>(null)
    const [cooperationsStatus, setCooperationsStatus] = useState<RequestForCooperationStatus>(RequestForCooperationStatus.PENDING)

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {data: incomingCooperations, isFetching} = useGetIncomingCooperationsQuery(`status=${cooperationsStatus}`, {
        skip: isOpen
    })
   
    const setCooperationsStatusHandler = (status: RequestForCooperationStatus) => {
        setCooperationsStatus(status)
    }

    const openConfirmModal =  (id: number, status: RequestForCooperationStatus) => {
        setChoosedStatus(status)
        setChoosedId(id)
        onOpen()
    }

    return(
        <>
            <CustomButtonGroupCooperations cooperationsStatus={cooperationsStatus} callback={setCooperationsStatusHandler}/>
            
            {isFetching?
                <CustomSpinner/>
                :
                <>
                    {isOpen && 
                        <DecisionConfirmModal isOpen={isOpen} onClose={onClose} id={choosedId} status={choosedStatus}/>
                    }

                    {incomingCooperations &&
                        <>
                            {incomingCooperations.map(({first_name, last_name, email, created_at, message, username, id, status}: Cooperations) => 
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
                                                <Text fontSize={isLargerThan426? 'xl' : 'sm'} as='b' color='black'>
                                                    {last_name} {first_name}
                                                </Text>
                                            </Flex>
                                            
                                            <Text>{message}</Text>
                                            <Flex mt={1} fontSize={isLargerThan426? 'sm' : 'xs'} as='b'>
                                                <Text color='purple.600'>
                                                    {username}
                                                </Text>
                                                <Text ml={2}>
                                                    {email}
                                                </Text>
                                            </Flex> 
                                            <Text fontSize={isLargerThan426? 'sm' : 'xs'} mt={2}>
                                                {moment(created_at).format('MMMM, DD HH:mm')}
                                            </Text>
                                        </Flex>
                                    </Flex>  

                                    {status === RequestForCooperationStatus.PENDING?
                                        <Flex direction='column' align='center'>
                                            <CustomButton 
                                                size={isLargerThan426? 'md' : 'xs'}
                                                m={1} 
                                                borderRadius='20px' 
                                                text="Approve" 
                                                colorSheme="whatsapp" 
                                                callback={() => openConfirmModal(id, RequestForCooperationStatus.APPROVED)}
                                            />
                                            <CustomButton 
                                                size={isLargerThan426? 'md' : 'xs'}
                                                m={1} 
                                                borderRadius='20px' 
                                                text="Reject" 
                                                colorSheme="red"
                                                callback={() => openConfirmModal(id, RequestForCooperationStatus.REJECTED)}
                                            />
                                        </Flex>
                                        :
                                        <Text fontSize={isLargerThan426? 'md' : 'xs'}  mr={3}>{status}</Text>
                                    }
                                </Flex>
                            )}
                            
                            {!incomingCooperations.length && 
                                <Text fontSize='xl' textAlign='center'>You don't have incoming cooperations</Text>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}