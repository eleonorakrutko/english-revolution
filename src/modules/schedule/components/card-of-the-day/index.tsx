import React from "react";
import {Card, Flex} from '@chakra-ui/react'
import { LessonsCard } from "./lesson-card";
import moment, { Moment } from 'moment'
import { CustomSpinner } from "../../../../ui";
import { useGetScheduleQuery } from "../../api/schedule-api";

type Props = {
    monday: Moment
}
type Arguments = {
    title: string, 
    id: number, 
    date_from: string, 
    date_to: string,
    type: string
}

export const CardOfTheDay = ({monday}: Props) => {
    const {data: schedule, isFetching} = useGetScheduleQuery({date_from: monday.format('YYYY-MM-DD'),date_to: monday.clone().add(1, 'week').format('YYYY-MM-DD')})

    return(
        <>
            {isFetching?
                <CustomSpinner/>
                :
                <Flex>
                    {schedule.map((item: any, index: any) => 
                        <Card w='20%' key={index} minH='fit-content' p={1}>
                            {item.map(({title, id, date_from, date_to, type}: Arguments) => 
                                <LessonsCard 
                                    topic={title} 
                                    key={id}
                                    id={id} 
                                    type={type}
                                    time={`${moment(date_from).format('HH:mm')} - ${moment(date_to).format('HH:mm')}`} 
                                    bg={type === 'INDIVIDUAL'? 'purple.500': 'pink.500'}
                                />
                            )}
                        </Card>
                )}
                </Flex>
            }
        </>
       
       
        
    )
}