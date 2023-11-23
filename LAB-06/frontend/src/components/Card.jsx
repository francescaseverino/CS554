import React, {useState, useEffect}from 'react'
import {Link} from 'react-router-dom'
import noImage from '../img/download.jpg';
import {useSelector} from 'react-redux';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

export default function Card({data, id}) {

  const allCollections = useSelector((state) => state.collections);
  const index = allCollections.findIndex((x)=> x.selected === true);
  // console.log(id)
  let comicExists = allCollections[index].comics.findIndex((x)=> x.id === parseInt(id));
  // console.log(comicExists)
  let no = allCollections[index].full;
  // console.log(no)
  const[add, setAdd] = useState(comicExists !== -1)

  const dispatch = useDispatch();

  const addtoCollection = () => {
    dispatch(actions.addToCollection(data));
    setAdd(!add);
  }

  const delFmCollection = () => {
    dispatch(actions.delFmCollection(data));
    setAdd(!add);
  }

  return(
    <div className="grid-auto-fit grid w-full gap-12">

      <div className="flex flex-col justify-between bg-gray-600 p-8">

        <div className='grid place-items-center p-2 justify-items' >
          <h3 className="text-2xl">{data.title}</h3>
          <img className="w-1/2 p-2" src={ data.images[0]?.path && data.images[0]?.extension ? data.images[0].path + '.' + data.images[0].extension : noImage}/>
        </div>

      <div className="flex flex-row justify-between bg-gray-600 p-8">
          {!no ? 
            add ? (
              <button className="btn" onClick={delFmCollection}>Give Up</button>
            ) : (
              <button className="btn" onClick={addtoCollection}>Collect</button>
            ) : add ? (
              <button className="btn" onClick={delFmCollection}>Give Up</button>
          ) : (<></>)}
        <Link to={`/marvel-comics/${id}`} className="btn">
          View
        </Link>
      </div>
      </div>

    </div>
  )
}