import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateCourseMutation } from "../features/course/courseApi";

export default function AddCourse() {
  const [courseTitle, setCourseTitlle] = useState("");
  const [courseCategory, setCourseCatagory] = useState("");

  const [createCourse] = useCreateCourseMutation();

  const navigate = useNavigate();
  const courseHandler = async(e) => {
    e.preventDefault();
    console.log("Course Title:", courseTitle);
    console.log("Course Category:", courseCategory);
    const courseData = {courseCategory,courseTitle}
    // await createCourse(courseData);
    try {
      await createCourse(courseData).unwrap();
      // navigate("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={courseHandler} className="space-y-4 p-4">
      <input
        onChange={(e) => setCourseTitlle(e.target.value)}
        value={courseTitle}
        type="text"
        placeholder="Course title"
        className="input input-bordered w-full"
      />

<select
  value={courseCategory}
  onChange={(e) => setCourseCatagory(e.target.value)}
  className="select select-ghost w-full"
>
  <option disabled value="">
    Select Category
  </option>
  <option value="NextJs">Next Js</option>
  <option value="JavaScript">JavaScript</option>
  <option value="Docker">Docker</option>
  <option value="MongoDb">MongoDb</option>
  <option value="NodeJs">Node Js</option>
  <option value="Python">Python</option>
  <option value="Django">Django</option>
  <option value="Wordpress">Wordpress</option>
</select>


      <button type="submit" className="btn btn-neutral w-full">
         Save
      </button>
      <button onClick={()=>navigate(-1)} className="btn btn-neutral w-full">
         Back
      </button>
    </form>
  );
}
