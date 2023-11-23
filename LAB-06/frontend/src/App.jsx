import {  BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import BadRequest from './pages/BadRequest'
import CollectionList from './pages/CollectionList'
import Comic from './pages/Comic'
import ComicList from './pages/ComicList'

function App() {

  return (
    <Router>
      <div className='grid grid-rows-2 p-20'>
          <h2 className="text-4xl">Marvel API: Redux and Express!</h2>
          <div className='grid grid-cols-2 gap-4'>
            <Link className="btn" to={'/marvel-comics/collections'}>
              SubCollections
            </Link>
            <Link className="btn" to={'/marvel-comics/page/1'}>
              Comic Gallery
            </Link>
          </div>
      </div>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/marvel-comics/page/:pagenum' Component={ComicList}/>
        <Route path='/marvel-comics/:id' Component={Comic}/>
        <Route path='/marvel-comics/collections' Component={CollectionList}/>
        <Route path='/NotFound' Component={NotFound}/>
        <Route path='/BadRequest' Component={BadRequest}/>
      </Routes>
    </Router>
  )
}

export default App
