import React, { useEffect, ChangeEvent } from 'react';
import { Wrap, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Text } from '@chakra-ui/react';
import styles from './sign-in-form.module.css'
import { CustomButton, CustomModal } from '../../../ui';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { validate } from '../../../helpers';
import { signIn } from '../store/action-creators'; 
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RolesEnum } from '../../../types/roles-enum';
import { CustomInput } from '../../../components';
import { useInputsForm } from '../../../hooks/useInputsForm';

interface SignInData{
    email: string,
    password: string,
}

export const SignInForm = () => {
    const { user, error } = useTypedSelector(state => state.authReducer)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isErrorBorder, setIsErrorBorder] = useState<boolean>(false)
    
    const [inputData, onChangeInputData] = useInputsForm<SignInData>({
        email: '',
        password: ''
    })

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
 
    const moveToSignUp = () => {
        navigate('/sign-up')
    }

    const onSubmit = () => {
        const {email, password} = inputData
        dispatch(signIn({email, password}))

    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsErrorBorder(false)
        onChangeInputData(event)
    }

    return (
        <>
            {error && 
                <CustomModal isOpen={isOpen} onClose={onClose} bg='red.100'>
                    <ModalHeader>Sign in failed</ModalHeader>
                    <ModalBody pb='20px'>
                        <Text>{error}</Text>
                    </ModalBody>
                </CustomModal>
            }
            
            <Box className={styles.container}>
                <Wrap className={styles.wrapper} direction='column' w='700px' h='555px'>
                    <CustomInput 
                        value={inputData.email}
                        borderColor={isErrorBorder? 'red.400' : 'gray.200'}
                        name='email'
                        placeholder='Email' 
                        type='email' 
                        onChangeCallback={onInputChange}
                        validateCallback={() => validate(inputData.email, {isEmail: true})}
                    />
                    <CustomInput 
                        value={inputData.password}
                        name='password'
                        borderColor={isErrorBorder? 'red.400' : 'gray.200'}
                        placeholder='Password' 
                        type='password' 
                        onChangeCallback={onInputChange}
                        validateCallback={() => validate(inputData.password, {minLength: 6, maxLength: 16})}
                    />
                    <CustomButton text='Sign in' callback={onSubmit}/>
                    <CustomButton variant='outline' text='Sign up' callback={moveToSignUp}/>
                </Wrap>
            </Box>
        </>
        
    )
};
