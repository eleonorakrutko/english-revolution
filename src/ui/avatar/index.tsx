import { Avatar } from "@chakra-ui/react";
import React from "react";

type Props = {
    name: string, 
    src: string,
    size? : string
}

export const CustomAvatar = ({name, src, size}: Props) => {
    return(
        <Avatar name={name} src={src} size={size}/>
    )
}