import React, {useState} from "react";
import { Box,  Wrap } from "@chakra-ui/react";
import { CustomButton } from "../../../ui";
import styles from './sign-up-form.module.css'
import { RadioFormControl } from "./radio-form-control/sign-up-radio-form-control";
import { validate } from "../../../helpers";
import { signUp } from "../api/sign-up";
import { RolesEnum } from "../../../types/roles-enum";
import CookiesService from "../../../services/cookie-service";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../../components";
import { useInputsForm } from "../../../common/hooks/useInputsForm";

interface SignUpData{
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
}

export const SignUpForm = () => {
    const [choosedOption, setChoosedOption] = useState<RolesEnum>(RolesEnum.STUDENT)
    const [inputData, onChangeInputData] = useInputsForm<SignUpData>({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    })
   
    const navigate = useNavigate()

    const onSubmit = async () => {
        const {email, username, password, first_name, last_name} = inputData 
        const {data: {token}} = await signUp(email, username, password, first_name, last_name, choosedOption)
        CookiesService.setAuthorizationToken(token)
        navigate('/sign-in')
    }


    return(
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
    )
}