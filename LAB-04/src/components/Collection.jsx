import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate} from 'react-router-dom';
import download from '../img/download.jpg'
import {Card, CardActionArea, CardContent, Grid, CardMedia, Typography, Avatar} from '@mui/material'

function Collection() {
  const [loading, setLoading] = useState(true)
  const [artData, setArtData] = useState(undefined)
  let nav = useNavigate()
  let { id } = useParams()

  useEffect(()=>{
    async function fetchData(){
        try {
          if(!id || id.trim().length === 0 || !Number.isInteger(parseInt(id))) {throw "Invalid Id Parameter"}
        } catch (error) {
          setLoading(false)
          console.log(error)
          return nav('/BadRequest')
        }

        try {
          const {data} = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).catch((error)=>{throw error.response.data.message})
          setArtData(data)
          setLoading(false)

        } catch (error) {
          setLoading(false)
          console.log(error)
          return nav('/PageNotFound')

        }
    }
    fetchData()
  }, [id])

  if(loading){
    return (
      <div>
        <h3>Loading.....</h3>
      </div>
    )
  } else {
    return (
      <div>
        <Link className='link-collection' to='/collection/page/1'> SEE THE COLLECTION</Link>
        <Card sx={{borderRadius:'30%'}}>
            <CardMedia component='img' image={
                artData && artData.primaryImage ? artData.primaryImage : download
            } title='art-piece image' onError={(event)=>{event.target.src = download}}>
            </CardMedia>
            <CardContent>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Title: {artData.title ? artData.title : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Artist: {artData.artistDisplayName ? artData.artistDisplayName : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Artist Bio: {artData.artistDisplayBio ? artData.artistDisplayBio : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Artist Gender: {artData.artistGender ? artData.artistGender : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Object's Date: {artData.objectDate ? artData.objectDate : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Department: {artData.department ? artData.department : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Medium: {artData.medium ? artData.medium : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Classifcation: {artData.classification ? artData.classification : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Culture: {artData.culture ? artData.culture : 'N/A'}</Typography>
              <Typography variant='body1' sx={{fontFamily:'fantasy'}}>Dimensions: {artData.dimensions ? artData.dimensions : 'N/A'}</Typography>
            </CardContent>
        </Card>

      </div>
    )
  }

}

export default Collection
