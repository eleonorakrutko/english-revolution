import React, { useState } from "react";
import { Box, Flex, Text, useDisclosure, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styles from './index.module.css'
import { CustomButton, CustomSpinner } from "../../ui";
import { DeleteConfirmModal } from "../../components";
import { MdContentPasteSearch, MdDelete } from "../../components";
import { CreateGroup } from "./components";  
import { RolesEnum } from "../../types/roles-enum";
import { useDeleteGroupMutation, useGetGroupsQuery } from "./api/group-api";
import { useTypedSelector } from "../../common/hooks/useTypedSelector";

type Arguments = {
    name: string,
    students_count: number,
    id: number
}

export const GroupListModule = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setId] = useState<number | null>(null)
    const { user } = useTypedSelector(state => state.authReducer)

    const [ deleteGroup ] = useDeleteGroupMutation()
    const { data: groups, isFetching } = useGetGroupsQuery('')

    const openConfirmModal = (id: number) => {
        setId(id)
        onOpen()
    }

    return(
        <>
            <Flex justify='space-between'>
                <Text fontSize='2xl'>Groups List</Text>
                {user?.role_type !== RolesEnum.TEACHER &&
                    <CreateGroup/>
                }
            </Flex>
            
            {isFetching?
                <CustomSpinner/>
                :
                <>
                    {isOpen && 
                        <DeleteConfirmModal 
                            typeName='group'
                            deleteCallback={() => deleteGroup(id)}
                            isOpen={isOpen} 
                            onClose={onClose}
                        />
                    }
                    <Box>
                        {groups.map(({name, students_count, id}: Arguments) => 
                            <Flex 
                            m='10px 0' 
                            key={id} 
                            bg='white' 
                            align='center' 
                            p={2} 
                            borderRadius='30px' 
                            border='2px solid #B794F4' 
                            >

                                <Flex w='100%' align='center' justify='space-between'>
                                    <Flex direction='column' ml={4}>
                                        <Text mb={1} fontSize='xl' as='b' color='black'>{name}</Text>
                                        <Flex align='end'>
                                            <Text fontSize='md' as='b'>Students count:</Text>
                                            <Text fontSize='md' pl={2}>{students_count}</Text>
                                        </Flex> 
                                    </Flex>
                                    <Flex direction='column'>
                                        <NavLink 
                                            to={`/group-details/${id}`} 
                                            className={styles.navigateButton}
                                        >
                                            <Flex align='center' justify='center'>
                                                <Text ml='5px'>Group details</Text>
                                                <Icon as={MdContentPasteSearch} ml={2} mr={1.5}/>
                                            </Flex>
                                        </NavLink>
                                        {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN &&
                                            <CustomButton
                                                text="Delete group"
                                                colorSheme="red"
                                                borderRadius="20px"
                                                p='8px'
                                                m='3px'
                                                callback={() => openConfirmModal(id)}
                                                rightIcon={<Icon as={MdDelete} />}
                                            />
                                        }
                                        
                                    </Flex>
                                </Flex>

                            </Flex>
                        )}
                    </Box>
                </> 
            } 
        </>
    )
}