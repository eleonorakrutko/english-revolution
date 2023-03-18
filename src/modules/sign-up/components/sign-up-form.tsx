import React, {useState} from "react";
import { Box,  Wrap } from "@chakra-ui/react";
import { CustomButton, CustomInput } from "../../../ui";
import styles from './sign-up-form.module.css'
import { RadioFormControl } from "./radio-form-control/sign-up-radio-form-control";
import { validate } from "../../../helpers";
import { signUp } from "../api/sign-up";
import { RolesEnum } from "../../../types/roles-enum";
import CookiesService from "../../../services/cookie-service";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')

    const onSubmit = async () => {
        const {data: {token, user}} = await signUp(email, userName, password, firstName, lastName, choosedOption) //отправляю данные на бэкенд
        CookiesService.setAuthorizationToken(token)
        navigate('/sign-in')
    }

    const [choosedOption, setChoosedOption] = useState(RolesEnum.STUDENT)
    
    return(
        <Box className={styles.container}>
            <Wrap className={styles.wrapper} direction='column' w='800px' h='700px'>
                <CustomInput 
                    value={email}
                    placeholder='Email'
                    onChangeCallback={({target}) => setEmail(target.value)}
                    validateCallback={() => validate(email, {isEmail: true, minLength: 3})}
                />
                <CustomInput 
                    value={userName} 
                    placeholder='Username'
                    onChangeCallback={({target}) => setUserName(target.value)}
                    validateCallback={() => validate(userName, {minLength: 4})}
                />
                <CustomInput 
                    value={firstName} 
                    placeholder='First Name'
                    onChangeCallback={({target}) => setFirstName(target.value)}
                    validateCallback={() => validate(firstName, {minLength: 2})}
                />
                <CustomInput 
                    value={lastName}
                    placeholder='Last Name'
                    onChangeCallback={({target}) => setLastName(target.value)}
                    validateCallback={() => validate(lastName, {minLength: 2})}
                />
                
                <RadioFormControl options={[RolesEnum.STUDENT, RolesEnum.TEACHER, RolesEnum.SCHOOL_SUPER_ADMIN]} setChoosedOption={setChoosedOption}/>
                
                <CustomInput 
                    value={password}
                    type='password'
                    placeholder='Password' 
                    onChangeCallback={({target}) => setPassword(target.value)}
                    validateCallback={() => validate(password, {minLength: 6, maxLength: 16})}
                />
                <CustomButton text='Next' callback={onSubmit}/>
            </Wrap>
        </Box>
    )
}