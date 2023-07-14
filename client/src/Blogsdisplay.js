import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './Addtopic.css'
import {Image} from 'cloudinary-react';
export default function Blogsdisplay() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/blogs').then(res=>setData(res.data)).catch((err)=>console.log(err));
})
console.log(data);
  return (
    <div>
      {data.map(content => (
        <div key={content._id} className='each_blog'>
         <center><h2>{content.topic}</h2></center> 
         <hr></hr>
          
         <center><p>{content.keywords.map(task=>task+" - ")}</p></center>
          <hr></hr>
          
          <section className="image-section">
  <Image style={{ width: "300px", float: "left", marginRight: "10px" }} cloudName="dh1hurqdn" publicId={content.image1} />
  <p>{content.blog_section1}</p>
</section>

<section className="image-section">
  <Image style={{ width: "300px", float: "right", marginLeft: "10px" }} cloudName="dh1hurqdn" publicId={content.image2} />
  <p>{content.blog_section2}</p>
</section>
          
        </div>
      ))}
    </div>
  )
}
