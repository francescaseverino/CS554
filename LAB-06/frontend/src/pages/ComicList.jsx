import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import Card from '../components/Card';
import {useSelector} from 'react-redux';


export default function ComicList() {

  const [comicData, setComicData] = useState(undefined);
  const[loading, setLoading] = useState(true);
  const[finalpage, setFinalPage] = useState(false);
  const[length, setLength] = useState(undefined);
  let nav = useNavigate();
  let {pagenum} = useParams();
  let cards = null;

  const allCollections = useSelector((state) => state.collections);
  // console.log('all', allCollections)

  useEffect(()=>{
    console.log('useEffect fired')

    async function fetchData(){
      try{
        if(Number.isNaN(pagenum) || !Number.isInteger(parseInt(pagenum)) || !pagenum || pagenum <= 0){throw 'Invalid Page Param'}
      } catch(e){
        setLoading(false)
        console.log(e)
        return nav('/BadRequest')
      }

      try{
        const {data} = await axios.get(`http://localhost:3000/api/comics/page/${pagenum}`);

        if(data.results.length === 0){throw 'Error: No more pages.'}
        setLength(data.results.length);
        setComicData(data.results);
        setLoading(false);
        
        if(parseInt(pagenum) === 1165){
          setFinalPage(true);
        } else{
          setFinalPage(false);
        }

      } catch(e){
        setLoading(false)
        console.log(e)
        return nav('/NotFound')
      }
    }

    fetchData();

  }, [pagenum]);

  pagenum = parseInt(pagenum);

  cards = comicData && comicData.map((com)=>{
    return <Card key={com.id} data={com} id={com.id}/>
  })


  if(loading){
    return (
      <div>
        <h2>Loading .... </h2>
      </div>
    )
  } else {
    if (pagenum === 1){
      return (
        
        <div>
          <div className='text-center p-10'>
            <p className='text-2xl'>Current Collection: {allCollections.map((com)=>{
              if(com.selected){
                return com.name + ' -> Number of Comics in Collection: ' + com.comics.length
              }
            })}</p>
          </div>

          <Link to={`http://localhost:5173/marvel-comics/page/${pagenum+1}`} className="btn">
              NEXT
          </Link>

          <br/>
          <br/>

          <div className="grid-auto-fit grid w-full gap-12">
            {cards}
          </div>
        </div>
      )
    } else if (finalpage){
      return(
        <div>

          <div className='flex flex-row p-10'>
            <p className='text-2xl'>Current Collection: {allCollections.map((com)=>{
              if(com.selected){
                return com.name + ' -> Number of Comics in Collection: ' + com.comics.length
              }
            })}</p>
          </div>


          <Link to={`http://localhost:5173/marvel-comics/page/${pagenum-1}`} className="btn">
              PREVIOUS
          </Link>

          <br/>
          <br/>

          <div className="grid-auto-fit grid w-full gap-12">
            {cards}
          </div>
        </div>
      )
    } else {
      return(
        <div>

          <div className='flex flex-row p-10'>
            <p className='text-2xl'>Current Collection: {allCollections.map((com)=>{
              if(com.selected){
                return com.name + ' -> Number of Comics in Collection: ' + com.comics.length
              }
            })}</p>
          </div>

          <div className='grid grid-cols-2 gap-4'>

            <Link to={`http://localhost:5173/marvel-comics/page/${pagenum-1}`} className="btn">
                PREVIOUS
            </Link>


            <Link to={`http://localhost:5173/marvel-comics/page/${pagenum+1}`} className="btn">
                NEXT
            </Link>
          </div>
          <br/>
          <br/>

          <div className="grid-auto-fit grid w-full gap-12">
            {cards}
          </div>
        </div>
      )
    }
  }
}