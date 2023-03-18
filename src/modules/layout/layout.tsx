import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation } from '../../components'

export const Layout = () => {
    return(
        <Grid
            templateAreas={`"nav header"
                            "nav main"`}
            gridTemplateRows={'62px 1fr'}
            gridTemplateColumns={'1fr 5fr'}
            h='100%'
            color='blackAlpha.700'
        >
            <GridItem area={'header'} bgColor='rgba(0, 0, 0, 0.04)'>
                <Header/>
            </GridItem>
            <GridItem  area={'nav'} bgColor='rgba(0, 0, 0, 0.04)'>
                <Navigation/>
            </GridItem>
            <GridItem area={'main'} p={6} bg='white'>
                <Outlet/>
            </GridItem>
        </Grid>
           
    )
}