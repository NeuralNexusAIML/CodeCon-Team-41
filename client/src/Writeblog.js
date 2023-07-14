import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Addtopic.css'
import {Image} from 'cloudinary-react';
import e from 'cors';
export default function Writeblog() {
const location=useLocation();
const id=location.state.topic_id;
// console.log(location.state.topic_id);
const [data,setData]=useState();
const [blog1Data,setblog1Data]=useState();
const [blog2Data,setblog2Data]=useState();
const [image1UploadStatus,setImage1UploadStatus]=useState("");
const [image2UploadStatus,setImage2UploadStatus]=useState("");

const [image1Selected,setImage1Selected]=useState("");
const [image2Selected,setImage2Selected]=useState("");
const [image1Url,setImage1Url]=useState("");
const [image2Url,setImage2Url]=useState("");
  useEffect(()=>{
    axios.post('http://localhost:5000/getinfoofblog',{topic_id:id}).then(res=>setData(res.data)).catch((err)=>console.log(err));
})

// const [data,setData]=useState([]);
// useEffect(()=>{
//   axios.get('http://localhost:5000/blogs').then(res=>setData(res.data)).catch((err)=>console.log(err));
// })
// console.log(data);
const navigate=useNavigate();
const SubmitHandler=(e)=>{
    e.preventDefault();
    // console.log(data);
    console.log(".................................");
    console.log(image1Url);
    console.log(image2Url);
    console.log(blog1Data);
    console.log(blog2Data);
    console.log(".................................");
     axios.post('http://localhost:5000/writeparticulareblog',{topic_id:id,blog_section1:blog1Data,blog_section2:blog2Data,image1:image1Url,image2:image2Url}).then(
        
        res=>{
            console.log(res.data);
            // setToken(res.data.token)
        }

            
    )
    document.getElementById("blog_section1").value="";
    document.getElementById("blog_section2").value="";
    // console.log(blog1Data);
    navigate('/blogsdisplay');
}
const ChangeHandler1=(e)=>{
    setblog1Data(e.target.value);
}
const ChangeHandler2=(e)=>{
  setblog2Data(e.target.value);
}


const upload1Image=(e)=>{
  e.preventDefault();
  setImage1UploadStatus("uploading....");
  console.log(image1Selected);
  const formData=new FormData();
  formData.append("file",image1Selected);
  formData.append("upload_preset","dsyehajp");
  // dh1hurqdn is the cloud name;
  axios.post("https://api.cloudinary.com/v1_1/dh1hurqdn/image/upload",formData).then((res)=>{
    console.log(res);
    console.log(res.data.public_id);
    
    if(res.data.public_id){
      setImage1Url(res.data.public_id);
      setImage1UploadStatus("Done!!");
    }
  })
};



const upload2Image=(e)=>{
  e.preventDefault();
  setImage2UploadStatus("uploading....");
  console.log(image2Selected);
  const formData=new FormData();
  formData.append("file",image2Selected);
  formData.append("upload_preset","dsyehajp");
  // dh1hurqdn is the cloud name;
  axios.post("https://api.cloudinary.com/v1_1/dh1hurqdn/image/upload",formData).then((res)=>{
    console.log(res);
    console.log(res.data.public_id);
    if(res.data.public_id){
      setImage2Url(res.data.public_id);
      setImage2UploadStatus("Done!!");
    }
  })
};
return (
    <center>
      {data && (
        <div>
          <form onSubmit={SubmitHandler}>
            {/* <h2>Topic: </h2> */}
            <textarea id="blog_section1"  className='write_blog' rows={26} cols={90} placeholder="Write the section1 content here!!"  onChange={ChangeHandler1} ></textarea><br></br>
            <textarea id="blog_section2"  className='write_blog' rows={16} cols={90} placeholder="Write the section2 content here!!"  onChange={ChangeHandler2} ></textarea>
            <div >
     {/* <form> */}
     <input type="file" accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage1Selected(e.target.files[0])}} required/>
     <button onClick={upload1Image}>Upload</button><p>{image1UploadStatus}</p>
     <input type="file" accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage2Selected(e.target.files[0])}} required/>
      <button onClick={upload2Image}>Upload</button><p>{image2UploadStatus}</p>
     {/* </form> */}
     {/* <Image style={{width: "100px"}} cloudName="dh1hurqdn" publicId="qmfspdz2f94qpgtjhumi" /> */}
    </div>
            <button className='write_btn' type="submit" onChange={SubmitHandler}>Submit</button>
          </form>

          
        </div>

        
      )}
    </center>
  );
}
