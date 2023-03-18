import React from 'react'
import { Icon, useDisclosure } from '@chakra-ui/react'
import { MdOutlineAdd } from '../../../../components'
import { CustomButton } from '../../../../ui'
import { CreateGroupModal } from '../modal'


export const CreateGroup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            {isOpen && 
                <CreateGroupModal onClose={onClose} isOpen={isOpen}/>
            }
            <CustomButton
                text='Create group'
                size='lg'
                borderRadius='20px'
                callback={() => onOpen()}
                rightIcon={<Icon boxSize={7} as={MdOutlineAdd}/>}
            />
        </>
    )
}