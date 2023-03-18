import { ValidationOptions } from "../../types/validationOptions";
import moment from 'moment'

export interface validationResult{
    isValid: boolean,
    errorMessages: string[]
}

export const validate = (value: string, {minLength, maxLength, isEmail, isBefore, isAfter}: ValidationOptions): validationResult => {
    const errorMessages = []

    if(isBefore){
        if(!moment(value).isSameOrBefore(moment(isBefore))){
            errorMessages.push(`Date should be before than ${moment(isBefore).format('DD MM YYYY HH:hh')}`)
        }
    }

    if(isAfter){
        if(!moment(value).isSameOrAfter(moment(isAfter))){
            errorMessages.push(`Date should be after than ${moment(isAfter).format('DD MM YYYY HH:hh')}`)
        }
    }
    
    if(isEmail){
        let validator = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
        if(!validator.test(value)){
            errorMessages.push('Email not valid')
        } 
    }

    if(minLength){
        if(value.length < minLength){
            errorMessages.push(`Min length should be more than ${minLength}`)
        } 
    }

    if(maxLength){
        if(value.length > maxLength){
            errorMessages.push(`Max length should be less than ${maxLength}`)
        }
    }

    return {
        isValid: Boolean(!errorMessages.length),
        errorMessages,
    }
}