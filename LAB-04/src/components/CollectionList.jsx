import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation, useParams, Link, useNavigate} from 'react-router-dom'
import CollectionListCard from './CollectionListCard'
import { Grid } from '@mui/material'


function CollectionList() {
  
  const [loading, setLoading] = useState(true)
  const [artData, setArtData] = useState(undefined)
  const [total, setTotal] = useState(undefined)
  let nav = useNavigate()

  let { page } = useParams()

  let departmentId = useLocation().search
  let cardsData = null

  
  useEffect(()=>{
    console.log('useEffect fired')

    
    async function fetchData(){
      try {
        if(Number.isNaN(page) || !Number.isInteger(parseInt(page)) || !page || page <= 0){throw 'Invalid Page Param'}

      } catch (error) {
        setLoading(false)
        console.log(error)
        return nav('/BadRequest')

      }

      try {
        let start = (page-1)* 50 
        let end = start + 50

        const {data} = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects')
        setArtData(data.objectIDs.slice(start, end))
        setTotal(data.total)
        if(page > ((data.total/50)+1)){throw 'Page Out of Bounds'}
        setLoading(false)
        
      } catch (error) {
        setLoading(false)
        console.log(error)
        return nav('/PageNotFound')

      }
    }

    async function fetchQuery(departmentId){
      let validDepartmentIDs = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21]
      try {
        departmentId = departmentId.split('=')
        if(departmentId[0] !== '?departmentIds'){throw "Invalid Query"}
        if(typeof departmentId[1] !== 'string' || !Number.isInteger(parseInt(departmentId[1]))|| !validDepartmentIDs.includes(parseInt(departmentId[1]))){throw "Invalid Department Number"}
        if(Number.isNaN(page) || !Number.isInteger(parseInt(page)) || !page || page <= 0){throw 'Invalid Page Param'}

      } catch (error) {
        setLoading(false)
        console.log(error)
        return nav('/BadRequest')
      }

      try {
        let start = (page-1)* 50 
        let end = start + 50
        
        const {data} = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects${departmentId[0]}=${departmentId[1]}`)
        setArtData(data.objectIDs.slice(start, end))
        setTotal(data.total)
        if(page > ((data.total/50)+1)){throw 'Page Out of Bounds'}
        setLoading(false)

      } catch (error) {
        setLoading(false)
        console.log(error)
        return nav('/PageNotFound')
      }
    }

    if(departmentId){
      fetchQuery(departmentId)
    } else {
      fetchData()
    }

  }, [page])

  page = parseInt(page)
  let finalpage = parseInt((total / 50) + 1)

  cardsData = artData && artData.map((id) =>{
    return <CollectionListCard id={id} key={id}/>
  })

  if(loading){
    return (
      <div>
        <h2>Loading .... </h2>
      </div>
    )
  } else {
    if (page === 1){
      return (
        <div>
          <Link to={`/collection/page/${page + 1}${departmentId ? departmentId : ''}`}>
            <button type='button' onClick={()=> page + 1}>
              NEXT
            </button>
          </Link>

          <br/>
          <br/>

          <Grid container spacing={5}>
            {cardsData}
          </Grid>
        </div>
      )
    } else if (page === finalpage){
      return(
        <div>
          <Link to={`/collection/page/${page - 1}${departmentId ? departmentId : ''}`}>
            <button type='button' onClick={()=> page - 1}>
              PREVIOUS
            </button>
          </Link>

          <br/>
          <br/>

          <Grid container spacing={5}>
            {cardsData}
          </Grid>
        </div>
      )
    } else {
      return(
        <div>
          <Link to={`/collection/page/${page - 1}${departmentId ? departmentId : ''}`}>
            <button type='button' onClick={()=> page - 1}>
              PREVIOUS
            </button>
          </Link>


          <Link to={`/collection/page/${page + 1}${departmentId ? departmentId : ''}`}>
            <button type='button' onClick={()=> page + 1}>
              NEXT
            </button>
          </Link>

          <br/>
          <br/>

          <Grid container spacing={5}>
            {cardsData}
          </Grid>
        </div>
      )
    }
  }
}

export default CollectionList
