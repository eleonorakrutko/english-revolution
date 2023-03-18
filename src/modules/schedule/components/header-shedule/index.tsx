import React from "react";
import { Flex, Text, Icon, ButtonGroup } from '@chakra-ui/react'
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
    return(
        <Flex justify='space-between' m={5} align='center'>
            <Text as='b' fontSize='2xl' >Schedule</Text>
                <ButtonGroup spacing='30px'>
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