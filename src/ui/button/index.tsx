import React, { ReactElement } from 'react';
import { Button } from '@chakra-ui/react'

type Props = {
    text?: string, 
    variant?: string, 
    callback?: () => void, 
    disabled?: boolean,
    colorSheme? : string,
    borderRadius? : string,
    size? : string,
    isActive?: boolean,
    rightIcon?: ReactElement<"svg"> | undefined,
    leftIcon?: ReactElement<"svg"> | undefined,
    p? : number | string
    m? : number | string
}

export const CustomButton = ({
    text, 
    variant = 'solid', 
    callback,
    p = 6, 
    m,
    disabled = false,
    isActive = false,
    size,
    colorSheme = 'purple', 
    borderRadius, 
    rightIcon, 
    leftIcon
}: Props) => {
    return (
        <Button 
            size={size}
            leftIcon={leftIcon} 
            rightIcon={rightIcon} 
            colorScheme={colorSheme} 
            p={p} 
            m={m}
            isDisabled={disabled}
            isActive={isActive}
            variant={variant} 
            onClick={callback} 
            borderRadius={borderRadius}
        >
            {text}
        </Button>
    )
};

