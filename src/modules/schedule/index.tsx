import React, {useState} from "react";
import { CardOfTheDay, AddLessonModal, DaysOfTheWeek, HeaderSchedule } from "./components";
import { useDisclosure } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { generateWeek } from "../../helpers/generate-week";

export const ScheduleModule = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [monday, setMonday] = useState<Moment>(moment().startOf('week').add(1, 'days'))
    console.log(monday)

    const setNextWeek = () => {
        setMonday(monday.clone().add(1, 'week'))
    }

    const setPrevWeek = () => {
        setMonday(monday.clone().subtract(1, 'week'))
    }

    return(
        <>  
            {isOpen && <AddLessonModal isOpen={isOpen} onClose={onClose}/>}
            
            <HeaderSchedule nextWeek={setNextWeek} prevWeek={setPrevWeek} onOpen={onOpen}/>
            <DaysOfTheWeek week={generateWeek(monday)}/>
            <CardOfTheDay monday={monday}/>
        </>
        
    )
}

