import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subtitle:{type:String},
    description: { type: String },
    price: { type: Number, min: 0 },
    courseThumbnail: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    courseCategory: {
      type: String,
      required: true
    },
     leactures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Lecture"
    }],
    courseLevel:{
      type:String,
      enum:["Beginner","Medium","Advance"]
    },
    
     creatore:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
     enrollStudent:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
     isPublish:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
