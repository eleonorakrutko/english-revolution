import React, {useState} from "react";
import { ScheduleCards, AddLessonModal,  HeaderSchedule } from "./components";
import { useDisclosure } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { generateWeek } from "../../helpers";

export const ScheduleModule = () => {
    const [monday, setMonday] = useState<Moment>(moment().startOf('week').add(1, 'days'))

    const { isOpen, onOpen, onClose } = useDisclosure()
    
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
            <ScheduleCards monday={monday} week={generateWeek(monday)} />
        </>
        
    )
}

