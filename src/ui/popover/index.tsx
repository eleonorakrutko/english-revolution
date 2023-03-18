import { PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Popover, Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
    trigger: React.ReactNode,
    content: React.ReactNode
}

export const CustomPopover = ({trigger, content}: Props) => {
    return(
        <Popover closeOnBlur>
            <PopoverTrigger>
                {trigger}
            </PopoverTrigger>
            <PopoverContent h='110px' w='max-content'  p={4} >
                <PopoverArrow />
                <PopoverCloseButton />
                <Flex align='center' justify='center' h='100%' m={4}>
                    {content}
                </Flex>
            </PopoverContent>
        </Popover>
    )
}