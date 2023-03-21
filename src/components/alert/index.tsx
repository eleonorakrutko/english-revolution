import { Alert, AlertIcon, AlertStatus, Box, CloseButton,  Fade, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useTypedDispatch } from '../../common/hooks/useTypedDispatch'
import { useTypedSelector } from '../../common/hooks/useTypedSelector'
import { hideAlert } from '../../modules/layout/store/alert-slice'

export const CustomAlert = () => {
    const { type, text, isShow } = useTypedSelector((state) => state.alertReducer)
    const dispatch = useTypedDispatch()

    const onClose = () => {
        dispatch(hideAlert())
    }

    useEffect(() => {
        setTimeout(() => {
            onClose()
        }, 5000)
    }, [])

    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    return(
        <Fade in={true}>
            <Alert 
                status={type as AlertStatus} 
                borderRadius='20px'  
                position='fixed' 
                w={isLargerThan426? '30%' : '70%'} 
                zIndex='10'
                top={2} 
                left='50%' 
                transform='translateX(-50%)'
            >
                <AlertIcon />

                <Box>
                    {text}
                </Box>
                
                <CloseButton
                    ml='auto'
                    onClick={onClose}
                />
        </Alert>
        </Fade>
        
    )
}