import React from 'react'
import { Button, Icon, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { MdOutlineAdd } from '../../../../components'
import { CustomButton } from '../../../../ui'
import { CreateGroupModal } from '../modal'


export const CreateGroup = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
            {isOpen && 
                <CreateGroupModal onClose={onClose} isOpen={isOpen}/>
            }
            {isLargerThan426? 
                <CustomButton
                    text='Create group'
                    size='lg'
                    borderRadius='20px'
                    callback={() => onOpen()}
                    rightIcon={<Icon boxSize={7} as={MdOutlineAdd}/>}
                />
                :
                <Button
                    colorScheme='purple'
                    size='md'
                    borderRadius='20px'
                    onClick={() => onOpen()}
                >
                    <Icon as={MdOutlineAdd}/>
                </Button>
            }
            
        </>
    )
}