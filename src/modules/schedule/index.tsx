import React, {useState} from "react";
import { CardOfTheDay, AddLessonModal,  HeaderSchedule } from "./components";
import { useDisclosure } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { generateWeek } from "../../helpers";

export const ScheduleModule = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [monday, setMonday] = useState<Moment>(moment().startOf('week').add(1, 'days'))

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
            <CardOfTheDay monday={monday} week={generateWeek(monday)} />
        </>
        
    )
}

