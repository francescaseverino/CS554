import './App.css'
import logo from './img/the_met_logo_small.png'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './components/Home'
import Collection from './components/Collection'
import CollectionList from './components/CollectionList'
import NotFound from './components/NotFound'
import BadRequest from './components/BadRequest'
import { Avatar, Grid } from '@mui/material'

function App() {
  return (
    <>
      <div className='app-container'>
        <header>
          <Grid container alignItems={'center'} spacing={6} flexWrap={'inherit'}>
            <Grid item>
              <Avatar src={logo} alt='logo' sx={{width:60, height:60}}/>
            </Grid>
            <Grid item>
              <h1 className='app-title'>The Metropolitan Museum of Art</h1>
            </Grid>
          </Grid>
        </header>
      </div>

      <br/>
      <br/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection/page/:page' element={<CollectionList/>}/>
        <Route path='/collection/:id' element={<Collection/>}/>

        <Route path='/PageNotFound' element={<NotFound/>}/>
        <Route path='/BadRequest' element={<BadRequest/>}/>
      </Routes>
    </>
  )
}

export default App
