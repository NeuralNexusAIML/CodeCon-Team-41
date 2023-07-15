import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import './Addtopic.css'

// import {Link} from 'react-router-dom'
export default function Addtopic() {
  const [item,setItem]=useState([]);
  const [showForm,setshowForm]=useState(false);
  const [newTask,setNewTask]=useState({
    topic:"",
    keywords:[],
  });
  
  const changeHandler=e=>{
    setNewTask({...newTask,[e.target.name]:e.target.value})
  }
  const [delTask,setDelTask]=useState([]);
  
  useEffect(()=>{
    axios.get("http://localhost:5000/gettask").then(
    // arr=>console.log(arr.data)
    arr=>setItem(arr.data)
      
    //   console.log(arr.data);
    // }

    )
  },[])

  const submitHandler=e=>{
    e.preventDefault();
    axios.post("http://localhost:5000/addtask",{todo:newTask}).then(
      arr=>setItem(arr.data)
    )
    
    document.getElementById("topic_id").value="";
    document.getElementById("keywords_id").value="";
    // console.log(newTask);
  }
  
  const deleteHandler=id=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr=>setItem(arr.data)
    )
  } 
  const navigate=useNavigate();
  const navigateHandler=id=>{
    navigate("/Writeblog",{state:{topic_id:id}})
  }


  return (
    <div>
      <center>
        <button onClick={()=>{setshowForm(true)}} className='submit_btn'>AddTopic</button>
        {
          showForm && (
            <form onSubmit={submitHandler} className="Form">
            <input id="topic_id" class="form_inputs" name="topic" type="text" placeholder="Enter Topic!! " onChange={changeHandler} required/><br></br>
            <input id="keywords_id" class="form_inputs" name="keywords" type="text" placeholder="Enter Keywords (seperated by comma ex:a,b,c)!! " onChange={changeHandler} required/><br></br>
            <button type="submit" className='submit_btn'>Submit</button>
          </form>
          )
        }
       
        {item.map(task=>
        <div class="each_topic">
            {/* <p>{task._id}</p> */}
          <h3>Topic : {task.topic} </h3><div> Keywords :{task.keywords.map(task=>task+" - ")}<button class="write_btn"  onClick={()=>navigateHandler(task._id)}>write</button><button class="delete_btn" onClick={()=>deleteHandler(task._id)}>Delete</button></div>
          
        </div>)}

        
      </center>
    </div>
  )
}
