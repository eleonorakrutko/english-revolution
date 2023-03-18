import React from 'react'
import { Icon, useDisclosure } from '@chakra-ui/react'
import { CustomButton } from '../../../../ui'
import { MdOutlineAdd } from '../../../../components/icons'
import { AddPersonModal } from '../modal' 

type Props =  {
    id: string | undefined,
}

export const AddPersonToTheGroupModule = ({id}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
            {isOpen && 
                <AddPersonModal isOpen={isOpen} onClose={onClose} id={id}/>
            }
            <CustomButton 
                text='Add person' 
                size='lg'
                borderRadius='20px'
                rightIcon={<Icon as={MdOutlineAdd}/>}
                callback={onOpen}
            />
        </>
        
    )
}