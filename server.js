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
  const { todo } = req.body;
  try {
    const newData = new TaskSchema({
      topic: todo.topic,
      keywords:todo.keywords.split(',')
      
    });
    await newData.save();

    return res.json(await TaskSchema.find({blog_status:false}));

    // console.log(todo.topic);
  } catch (err) {
    console.log(err);
  }
});


app.get('/gettask', async (req, res) => {
    try {
      return res.json(await TaskSchema.find({blog_status:false}));
    } catch (err) {
      console.log(err);
    }
  }); 
  app.post('/getinfoofblog',async (req, res) => {
    const {topic_id} = req.body;
    try {
      // const appliedvolunteer=await ApplyforvolunteerSchema.find({email:email});
      // await appliedvolunteer.updateOne({"email":email},{$set:{"accept":accept}});
      let task = await TaskSchema.findOne({_id:topic_id });
//       console.log(task);
// await TaskSchema.updateOne({_id:topic_id }, { $set: { blog: blog,blog_status:true} });
// task = await TaskSchema.find({_id: topic_id });
      // await  appliedvolunteer.save();
      return res.json(task);
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/writeparticulareblog',async (req, res) => {
    const {topic_id,blog,image1,image2,blog_section1,blog_section2} = req.body;
    try {
      // const appliedvolunteer=await ApplyforvolunteerSchema.find({email:email});
      // await appliedvolunteer.updateOne({"email":email},{$set:{"accept":accept}});
      let task = await TaskSchema.find({_id:topic_id });
      console.log(task);
await TaskSchema.updateOne({_id:topic_id }, { $set: { blog: blog,blog_status:true,image1:image1,image2:image2,blog_section1:blog_section1,blog_section2:blog_section2} });
task = await TaskSchema.find({_id: topic_id });
      // await  appliedvolunteer.save();
      return res.json(task);
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/blogs',async (req, res) => {
    // const {topic,blog} = req.body;
    try {
      // const appliedvolunteer=await ApplyforvolunteerSchema.find({email:email});
      // await appliedvolunteer.updateOne({"email":email},{$set:{"accept":accept}});
//       let task = await TaskSchema.find({topic:topic });
// await TaskSchema.updateOne({ topic:topic }, { $set: { blog: blog } });
// task = await TaskSchema.find({topic: topic });
      // await  appliedvolunteer.save();
      return res.json(await TaskSchema.find({blog_status:true}));
    } catch (err) {
      console.log(err);
    }
  });
app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find({blog_status:false}));
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
