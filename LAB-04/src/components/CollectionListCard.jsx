import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import download from '../img/download.jpg'
import {Card, CardActionArea, CardContent, Grid, CardMedia, Typography} from '@mui/material'

function CollectionListCard({id}) {
    const [artData, setArtData] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchData(){
            try {
                const {data} = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                setArtData(data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        fetchData()
    }, [])


    if(loading){
        return (
            <div>
                <p>Loading....</p>
                <br/>
            </div>
        )
    }
     else {
        return (
            <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={artData.objectID}>
                <Card variant='outlined' sx={{border: '3px solid'}}>
                    <CardActionArea>
                        <Link to={`/collection/${id}`}>
                            <CardMedia component='img' image={
                                artData && artData.primaryImage ? artData.primaryImage : download
                            } title='art-piece image' sx={{width:'100%', height:'100%', alignContent:'center'}} onError={(event)=>{event.target.src = download}}>
                            </CardMedia>
                            <CardContent>
                                <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Title: {artData.title ? artData.title : 'N/A'}</Typography>
                                <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Department: {artData.department ? artData.department : 'N/A'}</Typography>
                                <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Artist: {artData.artistDisplayName ? artData.artistDisplayName : 'N/A'}</Typography>
                                <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Object's Date: {artData.objectDate ? artData.objectDate: 'N/A'}</Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        )
     }
    
}

export default CollectionListCard
