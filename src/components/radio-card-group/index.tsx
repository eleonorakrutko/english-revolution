import { HStack, useRadioGroup } from "@chakra-ui/react"
import { RolesTitleEnum } from "../../modules/sign-up/constans/roles-title-enum"
import { RolesEnum } from "../../types/roles-enum"
import { RadioCard } from "./radio-card/radio-card" 

type Props = {
  options: string[],
  setChoosedOption: (value: RolesEnum) => void
}

export const RadioCardGroup = ({options, setChoosedOption}: Props) => {
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'role',
      defaultValue: options[0],
      onChange: (value) => setChoosedOption(value as RolesEnum) 
    })
  
    const group = getRootProps()
  
    return (
      <HStack {...group}>
        {options.map((value, index) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              { RolesTitleEnum[index] }
            </RadioCard>
          )
        })}
      </HStack>
    )
}