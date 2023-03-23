import { ChangeEvent, useState } from "react"

//тип T - неопределенный тип для входящих параметров

//дженерик нужен для того чтобы при вызове фнкции передать в нее тип в дженериках
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
