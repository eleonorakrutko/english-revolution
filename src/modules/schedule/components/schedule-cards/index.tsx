import React, {useState} from "react";
import {Box, Card, CardBody, CardHeader, Flex, Text, useDisclosure, useMediaQuery} from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { CustomSpinner } from "../../../../ui";
import { useGetScheduleQuery } from "../../api/schedule-api";
import styles from './index.module.css'
import { LessonDetailModal } from "../modal/lesson-detail/lesson-detail";

type Props = {
    monday: Moment,
    week: string[], 
}

type Arguments = {
    title: string, 
    id: number, 
    date_from: string, 
    date_to: string,
    type: string
}

export const ScheduleCards = ({monday, week}: Props) => {
    const [isLargerThan769] = useMediaQuery([
        '(min-width: 769px)'
    ])

    const [id, setId] = useState<number | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data: schedule, isFetching} = useGetScheduleQuery(
        {date_from: monday.format('YYYY-MM-DD'), date_to: monday.clone().add(1, 'week').format('YYYY-MM-DD')},
        {skip: isOpen}
    )
   
    return(
        <>
            {isOpen && <LessonDetailModal id={id} isOpen={isOpen} onClose={onClose}/>}

            {isFetching?
                <CustomSpinner/>
                :
                <Flex wrap={isLargerThan769? 'nowrap' : 'wrap'}>
                    {schedule.map((day: Arguments[], index: number) => 
                        <Flex 
                            key={index} 
                            direction='column' 
                            className={styles.wrapper} 
                            align='center' 
                            justify='center' 
                            bg='gray.100'
                        >
                            <Box minH='45px' display='flex' alignItems='center'>
                                <Text fontSize='md' fontWeight='bold'>{week[index]}</Text>
                            </Box>
                            <Card h='inherit' w='inherit' p={1}>
                                {day.map(({title, id, date_from, date_to, type}: Arguments) => 
                                    <Card 
                                        key={id}
                                        className={styles.card} 
                                        bg={type === 'INDIVIDUAL'? 'purple.500': 'pink.500'} 
                                        onClick={() => {
                                            setId(id)
                                            onOpen()
                                        }} 
                                        _hover={{bg: type === 'INDIVIDUAL'? 'purple.400' : 'pink.400'}}
                                    >
                                        <CardHeader className={styles.cardHeader} p='4px 12px 0'>
                                            <Text>{title}</Text>
                                        </CardHeader>
                                        <CardBody className={styles.cardBody} p='4px 12px'>  
                                            <Text color='white' mb={2}>{type.toLowerCase()}</Text>
                                            <Flex className={styles.wrapperTime} justify='center'>
                                                {`${moment(date_from).format('HH:mm')} - ${moment(date_to).format('HH:mm')}`} 
                                            </Flex>
                                        </CardBody>
                                    </Card>
                                )}
                            </Card>
                        </Flex>    
                    )}
                </Flex>
            }
        </>
    )
}
