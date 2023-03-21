import React from "react";
import { Flex, Text, Icon, ButtonGroup, useMediaQuery } from '@chakra-ui/react'
import { CustomButton } from "../../../../ui";
import { MdNavigateBefore, MdNavigateNext, MdOutlineAdd } from "../../../../components/icons";
import { RolesEnum } from "../../../../types/roles-enum";
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector";

type Props = {
    onOpen: () => void,
    nextWeek: () => void,
    prevWeek: () => void
}

export const HeaderSchedule = ({onOpen , nextWeek, prevWeek}: Props) => {
    const { user } = useTypedSelector(state => state.authReducer)
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    
    return(
        <Flex justify='space-between' m={isLargerThan426? 5 : 1} align='center' direction={isLargerThan426? 'row' : 'column'} >
            <Text as='b' fontSize='2xl'  mb={isLargerThan426? 0 : 2}>Schedule</Text>
                <ButtonGroup spacing='30px' mb={isLargerThan426? 0 : 3}>
                    <CustomButton  
                        size="sm" 
                        p={3} 
                        colorSheme="gray"
                        callback={prevWeek} 
                        leftIcon={<Icon boxSize={7} as={MdNavigateBefore}/>}
                    />
                    <CustomButton  
                        size="sm" 
                        p={3} 
                        colorSheme="gray"
                        callback={nextWeek} 
                        rightIcon={<Icon boxSize={7} as={MdNavigateNext}/>}
                    />
                </ButtonGroup>
                
                {user?.role_type !== RolesEnum.STUDENT && 
                    <CustomButton 
                        m={isLargerThan426? 0 : 3}
                        text="Add Lesson" 
                        size="lg"
                        borderRadius="20px" 
                        rightIcon={<Icon boxSize={7} as={MdOutlineAdd}/>} 
                        callback={onOpen}
                    />
                }
        </Flex>
    )
}