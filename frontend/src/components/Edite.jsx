import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useCourseUpdateMutation, useGetCourseQuery, usePublishCourseMutation } from "../features/course/courseApi";

export default function Edite() {
  const [input, setInput] = useState({
    courseTitle: "",
    subtitle: "",
    description: "",
    price: "",
    category: "",
    courseLevel: "",
    courseThumbnail: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  
const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {id} = useParams();
  const [courseUpdate] = useCourseUpdateMutation();
  const {data} = useGetCourseQuery(id);
 const course = data?.course;
 useEffect(()=>{
  if(course){
     setInput({
      courseTitle: course.courseTitle || "",
      subtitle: course.subtitle || "",
      description: course.description || "",
      price: course.price || "",
      category: course.category || "",
      courseLevel: course.courseLevel || "",
       courseThumbnail: ""
     })
  }
 },[course])
 console.log(course);
 const [publishCourse] = usePublishCourseMutation();

  const updateHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subtitle", input.subtitle);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }
 try {
  const updateCourse =  await courseUpdate({id,formData});
  console.log(updateCourse);
 } catch (error) {
  console.log(error?.data?.message);
  console.log(error);
 }    
   
  }

  const publishCourseStatus = async(action)=>{
    try {
     await publishCourse({courseId:id,query:action})
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="p-5">
      <div className="card bg-base-100 w-full shadow-sm">
        <div className="card-body space-y-6">
          <div className="flex justify-between items-center gap-7">
            <h2 className="card-title">
              Add detailed information regarding the course
            </h2>
            <button  onClick={()=>navigate(`lecture`)} className="text-blue-500 hover:underline">
              Go to lecture page
            </button>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="card-title">Basic Course Information</h2>
            <div className="flex gap-5">
              <button onClick={()=>publishCourseStatus(course?.isPublish ?"false":"true")} className="btn">
                {course?.isPublish ? "Unpublish":"Publish"}</button>
              <button className="btn btn-primary">Remove Course</button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={updateHandler}>
            <div>
              <label className="label">
                <span className="label-text">Course Title</span>
              </label>
              <input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={handleInputChange}
                placeholder="Enter course title"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Subtitle</span>
              </label>
              <input
                type="text"
                name="subtitle"
                value={input.subtitle}
                onChange={handleInputChange}
                placeholder="Enter subtitle"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Write course description"
                className="textarea textarea-bordered w-full"
                name="description"
                value={input.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex">
              <select
                name="category"
                value={input.category}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option disabled value="">
                  Category
                </option>
                <option>Design</option>
                <option>Development</option>
                <option>Marketing</option>
              </select>

              <select
                name="courseLevel"
                value={input.courseLevel}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option disabled value="">
                  Course Level
                </option>
                <option>Beginner</option>
                <option>Medium</option>
                <option>Advance</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Course Price</span>
              </label>
              <input
                type="number"
                name="price"
                value={input.price}
                onChange={handleInputChange}
                placeholder="Enter course price"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Course Thumbnail</span>
              </label>
              <input
                type="file"
                accept="image/*"
                name="courseThumbnail"
                onChange={handleImageChange}
                placeholder="Enter course price"
                className="input input-bordered w-full"
              />
            </div>
            {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Thumbnail Preview"
                    className="rounded-lg shadow-md max-h-60 object-cover"
                  />
                </div>
              )}
              <button type="submit" className="btn">Create Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}
