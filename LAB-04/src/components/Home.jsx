import { Grid, Typography } from '@mui/material'
import React from 'react'
import logo from '../img/the_met_logo.png'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
      <Link className='link-collection' to='/collection/page/1'> SEE THE COLLECTION</Link>
      <Grid container className='app-container' spacing={1} direction={'row'} flexWrap={'wrap'}>
        <Grid item >
          <img src={logo} className='met_logo'/>
        </Grid>
        <Grid item alignContent={'center'} sx={{margin:1.5}}>
          <Typography variant='body1' sx={{fontFamily:'fantasy', fontSize:20}}>Welcome to the Metropolitan Museum of Art API!</Typography>
          <Typography variant='body1' sx={{fontFamily:'fantasy', fontSize:20}}>In the times of old, the world couldn't easily be able to access </Typography>
          <Typography variant='body1' sx={{fontFamily:'fantasy', fontSize:20}}>artworks from different periods of time.</Typography>
          <Typography variant='body1' sx={{fontFamily:'fantasy', fontSize:20}}>This website is for those who desire to see artwork of the past.</Typography>
          <br/>
          <Typography variant='body1' sx={{fontFamily:'fantasy', fontSize:20}}>Enjoy the experiance of the past, and enrich yourself with culture!</Typography>
          <br/>
          <br/>
          <img src='https://images.metmuseum.org/CRDImages/li/original/i20041986-cf.jpg' style={{width:400, borderRadius:'50%'}}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
