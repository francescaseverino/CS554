import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import * as actions from '../actions';

export default function CollectionCard({data, id}) {
    const dispatch = useDispatch();

    const deleteCollection = () => {
      dispatch(actions.deleteCollection(id));
    }

    const selectCollection = () => {
      dispatch(actions.selectCollection(id));
    }

  return(
    <div className="grid-auto-fit grid w-full gap-12">

      <div className="flex flex-col space-y-4 items-center bg-gray-600 p-8">
          <h3 className="text-xl">{data.name}</h3>
          <div className="flex flex-row space-x-10 bg-gray-600">
            {!data.selected && (
              <button className="btn" onClick={selectCollection} >Select</button>
            )}
            {!data.selected && (
              <button className="btn" onClick={deleteCollection} >Delete</button>
            )}
          </div>
          <div className='items-center'>
            <ol>
              {data.comics.map((x)=>{
                  return <li key={x.id}>{x.title} : ID {x.id} : <Link to={`/marvel-comics/${x.id}`} className='text-green-500 hover:text-yellow-500' >See Comic</Link></li>
                })}
            </ol>
          </div>
      </div>
    </div>
  )
}