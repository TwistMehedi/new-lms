import React from "react";
import { useParams } from "react-router";
import BuyCourseButton from "./BuyCourseButton";
// import { useGetCourseQuery } from "../../features/course/courseApi";
// import { useBuyCourseMutation } from "../../features/buy/buyApi";
  
 
 
export default function CourseDatails() {
  const { id } = useParams();
  const courseId = id;
  // const { data } = useGetCourseQuery(id);
  // const [buyCourse,{data:session}] = useBuyCourseMutation();
  // const course = data?.course;
  // console.log(course);
  // console.log(session);

  // const buyHandler = async()=>{
 
  //       await buyCourse({courseId:course._id});
  //      console.log(course._id);
       
     
  // }

  return (
    <div>
      <div>
        {courseId}
        {/* <h1>courseTitle: {course?.courseTitle}</h1>
        <h1>courseLevel: {course?.courseLevel}</h1>
        <h1>description: {course?.description}</h1>
        <h1>{course?.courseTitlle}</h1>
        <h1>{course?.courseTitlle}</h1> */}
      </div>
      <div>
        <h1> All Lectures</h1>
        {/* {course?.leactures.map((lecture, index) => ( 
          <div key={lecture._id}>
            <div className="collapse bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                <h2>
                  {index + 1}. {lecture?.lectureTitle}
                </h2>
              </div>
              <div className="collapse-content text-sm">
                <video width="400" height="200" controls>
                  <source src={lecture?.videoUrl?.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        ))} */}
      </div>
      {/* <button onClick={buyHandler} className="btn btn-neutral">Buy Course</button> */}
      <BuyCourseButton courseId={courseId}/>
    </div>
  );
}
