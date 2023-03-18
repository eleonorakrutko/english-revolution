import { Box, Checkbox, Flex, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { CustomAvatar } from "../../../ui";


type Props = {
    persons: any,
    selectedIds: number[],
    callback: (id: number, checked: boolean) => void
}

type Arguments = {
    id: number,
    first_name: string,
    last_name: string,
    username: string, 
    email: string,
}

export const MultiplyAssignList = ({persons,selectedIds, callback}: Props) => {
    return(
        <Box>
            {persons && 
                <>
                    {persons.map(({first_name, last_name, username, email, id}: Arguments) => 
                            <Flex 
                                m='10px 0' 
                                key={id} 
                                bg='white' 
                                align='center' 
                                p={2} 
                                borderRadius='30px' 
                                border='2px solid #B794F4' 
                                justify='space-between'
                            >
                                <Flex align='center'>
                                    <Wrap>
                                        <CustomAvatar size='lg' name='Dan Abramov' src='https://bit.ly/kent-c-dodds'/>
                                    </Wrap>
                                    <Flex direction='column' ml={4}>
                                        <Text mb={1} fontSize='xl' as='b' color='black'>{last_name} {first_name}</Text>
                                        <Text fontSize='sm' as='b' color='purple.600'>{username}</Text>
                                        <Text fontSize='sm' as='b'>{email}</Text>
                                    </Flex>
                                </Flex>
                                <Checkbox 
                                    isChecked={selectedIds.includes(id)}
                                    onChange={(event) => {
                                        callback(id, event.target.checked)   
                                    }}
                                    size='lg' 
                                    colorScheme='purple' 
                                    mr={4}
                                />
                            </Flex>
                        )
                    }
                </>
            }
        </Box>
    )
}