import React from 'react'
import logo from '../img/marvel_logo.png'


export default function Home() {
  return (
    <div className='grid place-items-center gap-4'>
        <h3>Welcome to the Marvel API!</h3>
        <img className="w-1/4" alt='marvel logo'src={logo}/>
        <p>You can create subcollections of comics, or simply view comics!</p>
    </div>
  )
}