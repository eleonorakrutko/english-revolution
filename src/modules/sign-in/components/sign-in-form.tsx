import React, { useEffect } from 'react';
import { Wrap, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Text } from '@chakra-ui/react';
import styles from './sign-in-form.module.css'
import { CustomButton, CustomInput } from '../../../ui';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { validate } from '../../../helpers';
import { signIn } from '../store/action-creators'; 
import { useTypedDispatch } from '../../../common/hooks/useTypedDispatch';
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import { RolesEnum } from '../../../types/roles-enum';

interface IMessageError{
    isError: boolean,
    errorMessage: string
}

export const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorBorder, setIsErrorBorder] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useTypedDispatch()
    const { user, error } = useTypedSelector(state => state.authReducer)


    const navigate = useNavigate()
    const moveToSignUp = () => {
        navigate('/sign-up')
    }

    useEffect(() => {
        if(error && error !== "Check authorization error"){
            onOpen()
        }
        if(!user){
            return
        }
        if(user?.role_type !== RolesEnum.SCHOOL_SUPER_ADMIN){
            navigate('/schedule')
        } else {
            navigate('/group-list')
        }
    }, [user, error])

    const onSubmit = () => {
        dispatch(signIn({email, password}))
    }


    return (
        <>
            {error && 
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent bg='red.100'>
                    <ModalHeader>Sign in failed</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb='20px'>
                        <Text>{error}</Text>
                    </ModalBody>
                    </ModalContent>
                </Modal>
            }
            
            <Box className={styles.container}>
                <Wrap className={styles.wrapper} direction='column' w='700px' h='555px'>
                    <CustomInput 
                        borderColor={isErrorBorder? 'red.400' : 'gray.200'}
                        value={email} 
                        placeholder='Email' 
                        type='email' 
                        onChangeCallback={({target}) => {
                            setIsErrorBorder(false)
                            setEmail(target.value)
                        }}
                        validateCallback={() => validate(email, {isEmail: true})}
                    />
                    <CustomInput 
                        value={password} 
                        borderColor={isErrorBorder? 'red.400' : 'gray.200'}
                        placeholder='Password' 
                        type='password' 
                        onChangeCallback={({target}) => {
                            setIsErrorBorder(false)
                            setPassword(target.value)
                        }}
                        validateCallback={() => validate(password, {minLength: 6, maxLength: 16})}
                    />
                    <CustomButton text='Sign in' callback={onSubmit}/>
                    <CustomButton variant='outline' text='Sign up' callback={moveToSignUp}/>
                </Wrap>
            </Box>
        </>
        
    )
};
