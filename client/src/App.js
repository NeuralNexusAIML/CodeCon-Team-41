import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Addtopic from './Addtopic'
import Blogsdisplay from './Blogsdisplay'
import Nav from './Nav'
import Writeblog from './Writeblog'
export default function App() {
  return (
    <div>
       <Router>
      <Nav/>
      {/* Routes are used to Switch between / and /dashboard like links */}
      <Routes>
        <Route path="/" element={<Addtopic/>}/>
        <Route path="/blogsdisplay"   element={<Blogsdisplay/>}/>
        <Route path="/Writeblog"   element={<Writeblog/>}/>
      </Routes>
      </Router>
    </div>
  )
}

