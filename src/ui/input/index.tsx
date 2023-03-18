import React, {ChangeEvent, useState} from 'react';
import { Input, Flex, Text } from '@chakra-ui/react';
import { ValidationOptions } from '../../types/validationOptions';
import { validationResult } from '../../helpers';

type Props = {
    value: string, 
    placeholder?: string, 
    focusBorderColor?: string,
    borderColor? : string, 
    type?: string, 
    minH?: string,
    validationOptions?: ValidationOptions,
    onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void
    validateCallback?: (value: string, validationOptions: ValidationOptions) => validationResult
}

export const CustomInput = ({
    value = '', 
    validationOptions = {}, 
    placeholder, 
    borderColor,
    focusBorderColor = 'purple.600', 
    type = 'text', 
    minH = '80px',
    onChangeCallback, 
    validateCallback
}: Props) => {
        const [isValid, setIsValid] = useState(true)
        const [errorMessages, setErrorMessages] = useState<string[]>([])

        const validateInput = () => {
            if(validateCallback){
                const {isValid, errorMessages} = validateCallback(value, validationOptions);
                setIsValid(isValid)
                setErrorMessages(errorMessages)
            }
        }
        
      
        return (
            <Flex minH={minH} flexDirection='column' align='center' wrap='wrap'>
                <Input 
                    value={value}
                    borderColor={borderColor}
                    isInvalid={!isValid}
                    placeholder={placeholder} 
                    focusBorderColor={focusBorderColor} 
                    size='lg' 
                    variant='outline' 
                    type={type} 
                    onChange={onChangeCallback}
                    onBlur={validateInput}
                    onClick={() => setIsValid(true)}
                />
                {!isValid && <Text m='5px' fontSize='14px' as='b' color='red.400'>{errorMessages.join(', ')}</Text>}
            </Flex>
           
        );
};
