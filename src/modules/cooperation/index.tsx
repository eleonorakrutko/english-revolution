import { Flex, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { RequestForCooperationStatus } from "../../types/request-for-cooperation-status";
import { CustomButton, CustomButtonGroupCooperations, CustomSpinner } from "../../ui";
import { useGetIncomingCooperationsQuery } from "./api/cooperations-api"; 
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
    const [choosedStatus, setChoosedStatus] = useState<string>('')
    const [choosedId, setChoosedId] = useState<number | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [cooperationsStatus, setCooperationsStatus] = useState<RequestForCooperationStatus>(RequestForCooperationStatus.PENDING)

    const setCooperationsStatusHandler = (status: RequestForCooperationStatus) => {
        setCooperationsStatus(status)
    }

    const {data: incomingCooperations, isFetching} = useGetIncomingCooperationsQuery(`status=${cooperationsStatus}`, {
        skip: isOpen  //не вызвается и не ререндерится пока не закрыта модалка
    })

    const openConfirmModal =  (id: number, status: RequestForCooperationStatus) => {
        setChoosedStatus(status)
        setChoosedId(id)
        onOpen()
    }
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    return(
        <>
            <CustomButtonGroupCooperations cooperationsStatus={cooperationsStatus} callback={setCooperationsStatusHandler}/>
            
            {isFetching?
                <CustomSpinner/>
                :
                <>
                    {isOpen && 
                        <ConfirmModal isOpen={isOpen} onClose={onClose} id={choosedId} status={choosedStatus}/>
                    }

                    {incomingCooperations &&
                        <>
                            {incomingCooperations.map(({first_name, last_name, email, created_at, message, username, id, status}: Props) => 
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