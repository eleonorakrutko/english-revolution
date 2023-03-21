import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { RadioCardGroup } from "../../../../components/radio-card-group";
import styles from './sign-up-radio-form-control.module.css'
import { RolesEnum } from "../../../../types/roles-enum";

type Props = {
    options: string[]
    setChoosedOption: (value: RolesEnum) => void
}

export const RadioFormControl = ({options, setChoosedOption}: Props) => {
    return(
        <FormControl className={styles.wrapper}>
            <FormLabel className={styles.formLabel}>Your Role</FormLabel>
            <div className={styles.wrapperRadio}>
                <RadioCardGroup options={options} setChoosedOption={setChoosedOption}/>
            </div>
        </FormControl>
        
    )
}