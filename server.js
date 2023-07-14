const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TaskSchema = require("./models/schema.js");
const cors=require("cors");//used to use API's of backend in frontend

app.use(express.json()); // Added line to include the express.json() middleware
app.use(cors({
    origin:'*'
}))
app.get('/', (req, res) => {
  res.send("helloo");
  return res.json("hello");
});

app.post('/addtask', async (req, res) => {
  const { todo ,description} = req.body;
  try {
    const newData = new TaskSchema({
      todo: todo,
      description:description
    });
    await newData.save();
    // res.send(todo);
    return res.json(await TaskSchema.find());
  } catch (err) {
    console.log(err);
  }
});
app.post('/updatestatus', async (req, res) => {
  const { id } = req.body;
  try {
    // const newData = new TaskSchema({
    //   todo: todo
    // });
    // await newData.save();
    // res.send(todo);
    // console.log(id);
    await TaskSchema.updateOne({ "_id": id }, { $set: { "status": true} });
    return res.json(await TaskSchema.find({}));
  } catch (err) {
    console.log(err);
  }
});
app.post('/updstatus', async (req, res) => {
  const {prevTask,todo,description} = req.body;
  try {
    // const newData = new TaskSchema({
    //   todo: todo
    // });
    // await newData.save();
    // res.send(todo);
    // console.log(id);
    await TaskSchema.updateOne({ "todo": prevTask }, { $set: { "todo": todo,"description":description} });
    return res.json(await TaskSchema.find({}));
  } catch (err) {
    console.log(err);
  }
});


app.get('/gettask', async (req, res) => {
    try {
      return res.json(await TaskSchema.find());
    } catch (err) {
      console.log(err);
    }
  }); 
app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})
mongoose.connect('mongodb+srv://mernproject:mernproject@cluster0.7mfw6to.mongodb.net/').then(() => {
  console.log("Connected to the database!!");
});

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});
