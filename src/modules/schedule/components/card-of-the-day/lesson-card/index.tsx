import React from 'react'
import { Card, CardHeader, CardBody, Flex, useDisclosure, Text } from '@chakra-ui/react'
import styles from './index.module.css'
import { LessonDetailModal } from '../../modal/lesson-detail/lesson-detail'

type Props = {
    topic: string, 
    time: string, 
    bg: string,
    type: string,
    id: number,
}

export const LessonsCard = ({topic, time, bg, type, id }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(
        <>
            {isOpen && <LessonDetailModal id={id} isOpen={isOpen} onClose={onClose}/>}
            <Card 
                className={styles.card} 
                bg={bg} 
                onClick={onOpen} 
                _hover={{bg: type === 'INDIVIDUAL'? 'purple.400' : 'pink.400'}}
            >
                <CardHeader className={styles.cardHeader} p='4px 12px 0'>
                    <Text>{topic}</Text>
                </CardHeader>
                <CardBody className={styles.cardBody} p='4px 12px'>  
                    <Text color='white' mb={2}>{type.toLowerCase()}</Text>
                    <Flex className={styles.wrapperTime} justify='center'>
                        {time}
                    </Flex>
                </CardBody>
            </Card>
        </>
       
    )
}