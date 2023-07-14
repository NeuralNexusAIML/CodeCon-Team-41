const mongoose=require('mongoose');
const TaskSchema = new mongoose.Schema({
    // todo:{
    //     type:String,
    //     required:true
    // },
    topic:{
            type:String,
            required:true
        },
    keywords:{
            type:[String],
            required:true
        },
        blog_status:{
            type:Boolean,
            default:false,
        },
        blog_section1:{
            type:String,
            // default:''
        },
        blog_section2:{
            type:String,
            // default:''
        },
        image1:{
            type:String,
        },
        image2:{
            type:String,
        },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('TaskSchema',TaskSchema);