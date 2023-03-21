import { ChangeEvent, useState } from "react"

//тип T - неопределенный тип для входящих параметров

export const useInputsForm = <T>(inputsData: T): [T, (event: ChangeEvent<HTMLInputElement>) => void] => {
    const [inputData, setInputData] = useState<T>(inputsData)
    const onInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setInputData((inputData) => ({
            ...inputData,
            [target.name]: target.value
        }))
    }
    return [inputData, onInputChange]    
}