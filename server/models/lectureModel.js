import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle:{
        type:String,
         required:true
    },
    videoUrl:{
        public_id:{type:String, default:""},
        url:{type:String, default:""}
    }

},{timestamps:true});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;