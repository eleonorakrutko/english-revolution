import React, {useState} from "react";
import { Box,  Modal,  ModalBody,  ModalCloseButton,  ModalContent,  ModalHeader,  Text,  useDisclosure,  Wrap } from "@chakra-ui/react";
import { CustomButton, CustomModal } from "../../../ui";
import { RadioFormControl } from "./radio-form-control/sign-up-radio-form-control";
import { validate } from "../../../helpers";
import { signUp } from "../api/sign-up";
import { RolesEnum } from "../../../types/roles-enum";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../../components";
import { useInputsForm } from "../../../hooks/useInputsForm"; 
import styles from './index.module.css'
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { AxiosError } from "axios";

interface SignUpData{
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
}

export const SignUpForm = () => {
    const [choosedOption, setChoosedOption] = useState<RolesEnum>(RolesEnum.STUDENT)
    const [registrationError, setRegistartionError] = useState<string | null>(null)
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [inputData, onChangeInputData] = useInputsForm<SignUpData>({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    })
   
    const onSubmit = async () => {
        try{
            const {email, username, password, first_name, last_name} = inputData 
            await signUp(email, username, password, first_name, last_name, choosedOption)
            navigate('/sign-in')
        } catch(error){
            const isAxiosError = error instanceof AxiosError
            if(isAxiosError && Array.isArray(error.response?.data.message)){
                setRegistartionError(error.response?.data.message.join(', '))
                onOpen()
            }
            if(isAxiosError && typeof error.response?.data.message === 'string'){
                setRegistartionError(error.response.data.message)
                onOpen()
            }
        }
    }

    return(
        <>
            {registrationError && 
                <CustomModal isOpen={isOpen} onClose={onClose} bg='red.100'>
                    <ModalHeader>Sign up failed</ModalHeader>
                    <ModalBody pb='20px'>
                        <Text>{registrationError}</Text>
                    </ModalBody>
                </CustomModal>
            }
            
            <Box className={styles.container}>
                <Wrap className={styles.wrapper} direction='column' w='800px'>
                    <CustomInput 
                        value={inputData.email}
                        name='email'
                        placeholder='Email'
                        onChangeCallback={onChangeInputData}
                        validateCallback={() => validate(inputData.email, {isEmail: true, minLength: 3})}
                    />
                    <CustomInput 
                        value={inputData.username} 
                        name='username'
                        placeholder='Username'
                        onChangeCallback={onChangeInputData}
                        validateCallback={() => validate(inputData.username, {minLength: 4})}
                    />
                    <CustomInput 
                        value={inputData.first_name} 
                        name='first_name'
                        placeholder='First Name'
                        onChangeCallback={onChangeInputData}
                        validateCallback={() => validate(inputData.first_name, {minLength: 2})}
                    />
                    <CustomInput 
                        value={inputData.last_name}
                        name='last_name'
                        placeholder='Last Name'
                        onChangeCallback={onChangeInputData}
                        validateCallback={() => validate(inputData.last_name, {minLength: 2})}
                    />
                    
                    <RadioFormControl 
                        options={[RolesEnum.STUDENT, RolesEnum.TEACHER, RolesEnum.SCHOOL_SUPER_ADMIN]} 
                        setChoosedOption={setChoosedOption}
                    />
                    
                    <CustomInput 
                        value={inputData.password}
                        name='password'
                        type='password'
                        placeholder='Password' 
                        onChangeCallback={onChangeInputData}
                        validateCallback={() => validate(inputData.password, {minLength: 6, maxLength: 16})}
                    />
                    <CustomButton text='Next' callback={onSubmit}/>                
                </Wrap>
            </Box>
        </>
        
    )
}