import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useDisclosure, Icon, useMediaQuery, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styles from './index.module.css'
import { CustomButton, CustomSpinner } from "../../ui";
import { DeleteConfirmModal } from "../../components";
import { MdContentPasteSearch, MdDelete } from "../../components";
import { CreateGroup } from "./components";  
import { RolesEnum } from "../../types/roles-enum";
import { useDeleteGroupMutation, useGetGroupsQuery } from "./api/group-api";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { showAlert } from "../layout/store/alert-slice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";

type Arguments = {
    name: string,
    students_count: number,
    id: number
}

export const GroupListModule = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    const { user } = useTypedSelector(state => state.authReducer)
    const dispatch = useTypedDispatch()
    
    const [id, setId] = useState<number | null>(null)

    const [ deleteGroup, {isSuccess, isError} ] = useDeleteGroupMutation()
    const { data: groups, isFetching } = useGetGroupsQuery('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if(isSuccess){
            dispatch(showAlert({type: 'success', text: 'Group was successfully deleted!',}))
            onClose()
        }
        if(isError){
            dispatch(showAlert({type: 'error', text: 'Failed to delete group!'}))
            onClose()
        }
    }, [isSuccess, isError])

    const openConfirmModal = (id: number) => {
        setId(id)
        onOpen()
    }

    return(
        <>
            <Flex justify='space-between'>
                <Text fontSize='2xl'>Groups List</Text>
                {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN &&
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
                                        <Text mb={1} fontSize={isLargerThan426? 'xl' : 'md'} as='b' color='black'>{name}</Text>
                                        <Flex align='end' fontSize={isLargerThan426? 'md' : 'sm'}>
                                            <Text as='b'>Students count:</Text>
                                            <Text pl={2}>{students_count}</Text>
                                        </Flex> 
                                    </Flex>
                                    <Flex direction='column'>
                                        <NavLink 
                                            to={`/group-details/${id}`} 
                                            className={styles.navigateButton}
                                        >
                                            <Flex align='center' justify='center'>
                                                {isLargerThan426? 
                                                    <>
                                                        <Text ml='5px'>Group details</Text>
                                                        <Icon as={MdContentPasteSearch} ml={2} mr={1.5}/>
                                                    </>
                                                    :
                                                    <Icon as={MdContentPasteSearch} ml={2} mr={1.5}/>
                                                } 
                                            </Flex>
                                        </NavLink>
                                        
                                        {user?.role_type === RolesEnum.SCHOOL_SUPER_ADMIN &&
                                            <>
                                                {isLargerThan426? 
                                                    <CustomButton
                                                        text={isLargerThan426? 'Delete group' : ''}
                                                        colorSheme="red"
                                                        borderRadius="20px"
                                                        p='8px'
                                                        m='3px'
                                                        callback={() => openConfirmModal(id)}
                                                        rightIcon={<Icon as={MdDelete} />}
                                                    />
                                                    :
                                                    <Button
                                                        colorScheme='red'
                                                        borderRadius="20px"
                                                        p='3px'
                                                        m='3px'
                                                        onClick={() => openConfirmModal(id)}
                                                    >
                                                        <Icon as={MdDelete}/>
                                                    </Button>
                                                }
                                            </>    
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}
                        {!groups.length && 
                            <Text fontSize='xl' textAlign='center' mt={4}>You don't have groups</Text>
                        }
                    </Box>
                </> 
            } 
        </>
    )
}