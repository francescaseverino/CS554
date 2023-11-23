import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import noImage from '../img/download.jpg';
import {useSelector} from 'react-redux';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

export default function Comic() {

  const [comicData, setComicData] = useState(undefined);
  const[loading, setLoading] = useState(true);
  let nav = useNavigate();
  let {id} = useParams();

  
  const allCollections = useSelector((state) => state.collections);
  // console.log(allCollections)
  const index = allCollections.findIndex((x)=> x.selected === true);
  // console.log(id)
  let comicExists = allCollections[index].comics.findIndex((x)=> x.id === parseInt(id))
  // console.log(comicExists)
  let no = allCollections[index].full;

  const[add, setAdd] = useState(comicExists !== -1)

  const dispatch = useDispatch();

  const addtoCollection = () => {
    dispatch(actions.addToCollection(comicData));
    setAdd(!add);
  }

  const delFmCollection = () => {
    dispatch(actions.delFmCollection(comicData));
    setAdd(!add);
  }



  useEffect(()=>{
    async function fetchData(){

      try{
        if(!id || id.trim().length === 0 || !Number.isInteger(parseInt(id))) {throw "Invalid Id Parameter"}

      } catch(e){
        setLoading(false)
        console.log(e)
        return nav('/BadRequest')
      }

      try {
        const {data} = await axios.get(`http://localhost:3000/api/comics/${id}`);
        setComicData(data)
        setLoading(false)
        
      } catch (error) {
        setLoading(false)
        console.log(error)
        return nav('/NotFound')

      }
    }
    fetchData();
  }, [])

  if(loading){
    return (
      <div>
        <h3>Loading.....</h3>
      </div>
    )
  } else {
    return (
      <div>
        <div className='flex flex-row justify-center p-10'>
          <p className='text-2xl'>Current Collection: {allCollections.map((com)=>{
            if(com.selected){
              return com.name + ' -> Number of Comics in Collection: ' + com.comics.length
            }
          })}</p>
        </div>
        <div className="flex flex-row justify-center bg-gray-600 p-8">
        {!no ? 
            add ? (
              <button className="btn" onClick={delFmCollection}>Give Up</button>
            ) : (
              <button className="btn" onClick={addtoCollection}>Collect</button>
            ) : add ? (
              <button className="btn" onClick={delFmCollection}>Give Up</button>
          ) : (<p>No Space for more!</p>)}

        </div>

      <div className="m-32 space-y-8">
        <h3 className='text-4xl'>{comicData.title}</h3>  
        <img className="w-1/4" src={comicData.images[0]?.path && comicData.images[0]?.extension ? comicData.images[0].path + '.' + comicData.images[0].extension : noImage}/>
        <p>OnSaleDate: {comicData.dates[0].date.split('T')[0]}</p>
        <p>Price: {comicData.prices[0]?.price ? '$' + comicData.prices[0].price : 'No Price.'}</p>
        <p>{comicData.description ? comicData.description : 'No Description.'}</p>
      </div>

      </div>
    )
  }
}