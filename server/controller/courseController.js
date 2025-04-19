import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";
import { deleteImage, deleteVideo, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, courseCategory } = req.body;
    console.log(courseTitle,courseCategory);
    const creator = req.id;

    if (!courseTitle || ! courseCategory) {
      return res.status(400).json({
        message: "Somting is missing",
        success: false,
      });
    };

    const course = await Course.create({courseTitle,
      courseCategory,
      creator});

    res.status(201).json({
      message: "Course created",
      success: true,
      course,
      creator,
    });

  } catch (error) {
    console.error(error.message);
    console.log("Course create server error");
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByIdAndDelete(courseId).populate("leactures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    for(const lecture of course.leactures){
      if(lecture?.videoUrl?.public_id){
        await deleteVideo(lecture?.videoUrl?.public_id)
      }

      await Lecture.findByIdAndDelete(lecture._id)
    };

    if (course.image?.public_id) {
        await deleteImage(course.image.public_id);
      }

    res.status(200).json({
      message: "Course deleted successfully",
      success: true,
    
    });
  } catch (error) {
    console.error("Delete course error:", error.message);
    res.status(500).json({
      message: "Internal server image delete error",
      success: false,
    });
  }
};

export const getAllCourse = async (req, res) => {
    try {
      // Fetch all courses from the database
      const courses = await Course.find({isPublish:true}).populate({path:"creatore",select:"name image"});
  // console.log(courses);
  
      // If no courses are found, return a message
      if (!courses || courses.length === 0) {
        return res.status(404).json({
          message: "No courses found",
          success: false,
        });
      }
  
      // Send the list of courses
      res.status(200).json({
        message: "Courses fetched successfully",
        success: true,
        courses,
      });
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  
  export const getAdminCourse = async(req, res)=>{
    const userId = req.id;
    const adminCourses = await Course.find({creatore:userId});
    // console.log(adminCourses)
    if (!adminCourses) {
      return res.status(404).json({
        message: "AdminCourses Courses not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Admin Courses fetched successfully",
      success: true,
      adminCourses,
    });

  };

  export const getCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
  
      // Find the course by ID
      const course = await Course.findById(courseId).populate("leactures");
  // console.log(course)
      // If no course is found, return a 404 error
      if (!course) {
        return res.status(404).json({
          message: "Course not found",
          success: false,
        });
      }
  
      // Return the course data
      res.status(200).json({
        message: "Course fetched successfully",
        success: true,
        course,
      });
    } catch (error) {
      console.error("Error fetching course:", error.message);
      res.status(500).json({
        message: "Internal server single course error",
        success: false,
      });
    }
  };
  
  export const updateCourse = async (req, res) => {
    try {
      const { courseTitle, description, price,subtitle,category,courseLevel } = req.body;
      const file = req.file;
      const courseId = req.params.id;
  
 
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          message: "Course not found",
          success: false,
        });
      }
  
       
      if (courseTitle) course.courseTitle = courseTitle;
      if (description) course.description = description;
      if (price) course.price = Number(price);
      if (subtitle) course.subtitle = subtitle;
      if (category) course.category = category;
      if (courseLevel) course.courseLevel = courseLevel;
  
       
      if (file) {
 
        if (course.courseThumbnail && course.courseThumbnail.public_id) {
          await deleteImage(course.courseThumbnail.public_id);
        }
  
   
        const cloudResponse = await uploadMedia(file.path);
        course.courseThumbnail = {
          public_id: cloudResponse.public_id,
          url: cloudResponse.secure_url,
        };
      }
  
     
      const updatedCourse = await course.save();
  
      res.status(200).json({
        message: "Course updated successfully",
        success: true,
        course: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error.message);
      res.status(500).json({
        message: "Internal server course update error",
        success: false,
      });
    }
  };
  
  export const createLecture = async(req, res)=>{
    try {
      const {lectureTitle} = req.body;
      // console.log(lectureTitle);
      if (!lectureTitle) {
        return res.status(400).json({ message: "lectureTitle is required" });
      }
    const lecture =  await Lecture.create({lectureTitle});
    if(!lecture){
      return res.status(404).json({ message: "Lecture not found" });
    }
    // console.log("lecture",lecture);
     const course = await Course.findById(req.params.id)
     if(!course){
      return res.status(404).json({ message: "Course not found" });
    }
    // console.log("course",course);
    
    if(course){
      course.leactures.push(lecture);
      await course.save();
    }

    res.status(201).json({
      message: "Lecture Created",
      success: true,
    });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:"Lecture create server error",
        success:false
      })
    }
  };

  export const getLecture = async(req, res)=>{
    try {
      const course = await Course.findById(req.params.id).populate("leactures")
      // console.log(course);
      res.status(201).json({
        message: "Lecture Created",
        success: true,
        course
      });
    } catch (error) {
      console.log(error.message)
      console.log(error)
      return res.status(500).json({
        message:"Lecture geting server error",
        success:false
      })
    }
  };

  export const updateLecture = async(req,res)=>{
     try {
      const {lectureTitle}=req.body;
      // console.log(lectureTitle);
      
    const file = req.file;
    const {lectureId}=req.params;
     //  console.log(course);
     

     const lecture = await Lecture.findById(lectureId);
     console.log("Lecture",lecture);
     
     if(lectureTitle) lecture.lectureTitle = lectureTitle;

    if (file) {
      if (lecture.videoUrl && lecture.videoUrl.public_id) {
        await deleteVideo(lecture.videoUrl.public_id);
      }

 
      const cloudResponse = await uploadMedia(file.path);
      lecture.videoUrl = {
        public_id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      };
    }

    await lecture.save();
     
    

    res.status(200).json({
      message: "Lecture updated successfull",
      success: true,
  
    });
     } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", success: false })
     }
  };

  export const removeLecture = async(req, res)=>{
    const {lectureId} = req.params;
    try {
      const lecture = await Lecture.findById(lectureId);
      if(!lecture){
        return res.status(404).json({
          message:"Lecture not found",
          sucess: flase
        })
      };

      if(lecture.videoUrl.public_id){
        await deleteVideo(lecture.videoUrl.public_id)
      };

      await Course.updateOne({
        leactures:lectureId,
      },{$pull:{leactures:lectureId}});

      res.status(200).json({
        message:"Lecture remove successfully",
        success: true
      });

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server error lecture remove", success: false })
    }
  };

  export const getLectureById = async(req, res)=>{
    try {
      const {lectureId} = req.params;
      const lecture = await Lecture.findById(lectureId);
      if(!lecture){
        return res.status(404).json({
          message:"Lecture not found",
          sucess: flase
        })
      };
      res.status(200).json({
        message:"Lecture single found",
        success: true,
        lecture
      });

    } catch (error) {
      console.log(error)
     return res.status(500).json({ message: "Server error get lecture", success: false })
    }
  };

  export const publishAndUnPublishCourse = async(req, res)=>{
    try {
      const {publish} = req.query;
      console.log(publish);
      const course = await Course.findById(req.params.id);
      if(!course){
        return res.status(404).json({
          message:"Course not found",
          seccess: false
        })
      };

      // console.log(course);
      
      course.isPublish = publish === "true";
      await course.save();

      const messageStatus = course.isPublish ?"Publish":"Unpublish";
      return res.status(201).json({
        message:`Course is ${messageStatus}`,
        success: true
      });

    } catch (error) {
      return res.status(500).json({
        message:"Course publish server error",
        success: false
      })
    }
  };