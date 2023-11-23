import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import CollectionCard from '../components/collectionCard';
import AddCollection from '../components/addCollection';

export default function CollectionList() {
  const [addBtnToggle, setBtnToggle] = useState(false);
  const allCollections = useSelector((state) => state.collections);
  // console.log(allCollections)
  
  return (
    <div>
        <h3 className="text-2xl ">List of SubCollections</h3>
        <br/>
      <div className="flex flex-col justify-between bg-gray-600 p-5">
        <button className="btn" onClick={() => setBtnToggle(!addBtnToggle)}>Add Collection</button>
        <br/>
        <br/>
        <br/>
        {addBtnToggle && <AddCollection />}
      </div>

      <br/>
      <br/>

      <div className='h-10 text-center'>
        <p className='text-2xl'>Current Collection: {allCollections.map((com)=>{
          if(com.selected){
            return com.name + ' -> Number of Comics in Collection: ' + com.comics.length
          }
        })}</p>
      </div>

      <div className='flex flex-col space-y-4 justify-between'>
        {allCollections.map((com) =>{
          return <CollectionCard key={com.id} data={com} id={com.id}/>
        })}
      </div>

    </div>
  )
}