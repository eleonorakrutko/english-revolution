import React from 'react'
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation, CustomAlert } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'

export const Layout = () => {
    const [isLargerThan426] = useMediaQuery([
        '(min-width: 426px)'
    ])

    const {isShow} = useTypedSelector(state => state.alertReducer)
    
    return(
        <>
            {isShow && 
                <CustomAlert/>
            }
        
            <Grid
                templateAreas={`"nav header"
                                "nav main"`}
                gridTemplateRows={'62px 1fr'}
                gridTemplateColumns={`${isLargerThan426? '1fr' : '0'} 5fr`}
                h='100%'
                color='blackAlpha.700'
            >
                <GridItem area={'header'} bgColor='rgba(0, 0, 0, 0.04)'>
                    <Header/>
                </GridItem>
                <GridItem visibility={isLargerThan426? 'visible' : 'hidden'} area={'nav'}  bgColor='rgba(0, 0, 0, 0.04)'>
                    <Navigation/>
                </GridItem>
                <GridItem area={'main'} p={6} bg='white'>
                    <Outlet/>  
                </GridItem>
            </Grid>
        </>     
    )
}