import { Box, useRadio, UseRadioProps } from "@chakra-ui/react"
import React from 'react'

interface Props extends UseRadioProps{
  children: React.ReactNode
}

export const RadioCard = (props : Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  
  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        bg='purple.100'
        _checked={{
          bg: 'purple.500',
          color: 'white',
          borderColor: 'purple.600',
        }}
        px={7}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  )
}