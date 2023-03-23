import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { RadioCardGroup } from "../../../../components/radio-card-group";
import styles from './index.module.css'
import { RolesEnum } from "../../../../types/roles-enum";

type Props = {
    options: string[]
    setChoosedOption: (value: RolesEnum) => void
}

export const RadioFormControl = ({options, setChoosedOption}: Props) => {
    return(
        <Flex direction='column' className={styles.wrapper}>
            <Text mb={2}>Your Role</Text>
            <Flex justify='center'>
                <RadioCardGroup options={options} setChoosedOption={setChoosedOption}/>
            </Flex>
        </Flex>
    )
}