import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import Blogsdisplay from './Blogsdisplay'
import Addtopic from './Addtopic'
import './Nav.css'
export default function Nav() {
  // const [token,setToken]=useContext(store);
  return (
    <div className="whole_nav">
      <ul className='Nav'>
        <Link to='blogsdisplay'><li className='list_elements'>Blogs</li></Link>
        <Link to=''><li className='list_elements'>AddTopic</li></Link>
      </ul>
    </div>
  )
}
