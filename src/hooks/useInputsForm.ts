import { ChangeEvent, useState } from "react"

export const useInputsForm = <T>(inputsData: T): [T, (event: ChangeEvent<HTMLInputElement>) => void] => {
    const [inputData, setInputData] = useState<T>(inputsData)
    const onInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setInputData((prevInputData) => ({
            ...prevInputData,
            [target.name]: target.value
        }))
    }
    return [inputData, onInputChange]    
}
