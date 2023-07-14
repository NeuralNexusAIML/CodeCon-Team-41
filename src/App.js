import React,{useEffect,useState} from 'react'
import axios from "axios";
export default function App() {
  const [item,setItem]=useState([]);
  const [description,setDescription]=useState([]);
  const [newTask,setNewTask]=useState([]);
  const [prevTask,setPrevTask]=useState([]);
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
    axios.post("http://localhost:5000/addtask",{todo:newTask,description:description}).then(
      arr=>setItem(arr.data)
    )
  }

  const deleteHandler=id=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr=>setItem(arr.data)
    )
  } 
  const updateHandler=(id)=>{
    // console.log("----"+id);
    axios.post(`http://localhost:5000/updatestatus`,{id}).then(
      arr=>setItem(arr.data)
    )
  } 
  const updHandler=()=>{
    // console.log("----"+id);
    console.log(prevTask);
    axios.post(`http://localhost:5000/updstatus`,{prevTask,todo:newTask,description:description}).then(
      arr=>setItem(arr.data)
    )
  } 
  return (
    <div>
      <center>
        <form onSubmit={updHandler}>
        <input type="text" placeholder="prev task name task!! " onChange={(e)=>setPrevTask(e.target.value)} required/>
          <input type="text" placeholder="Enter task!! " onChange={(e)=>setNewTask(e.target.value)} required/>
          <input type="text" placeholder="Enter description!! " onChange={(e)=>setDescription(e.target.value)} required/>
          <button type="submit">update</button>

          

        </form>
        <form onSubmit={submitHandler}>
          <h2>for update</h2>
          <input type="text" placeholder="Enter task!! " onChange={(e)=>setNewTask(e.target.value)} required/>
          <input type="text" placeholder="Enter description!! " onChange={(e)=>setDescription(e.target.value)} required/>
          <button type="submit">Submit</button>
        </form>
        {item.map(task=>
        <div>
          <h3>task:{task.todo} :    description{task.description}    status:{task.status}<button onClick={()=>deleteHandler(task._id)}>Delete</button><button onClick={()=>updateHandler(task._id)}>Done</button></h3>
        </div>)}
      </center>
    </div>
  )
}
