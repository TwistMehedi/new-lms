import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useGetCreatoreCourseQuery } from "../../features/course/courseApi";
// import { useGetAdminCourseQuery } from "../../features/course/courseApi";
 
export default function Courses() {
  const {data} = useGetCreatoreCourseQuery();
  // console.log(data);
  
  const navigate = useNavigate()
  return (
     <>
     <div>
      {/* <AddCourse/> */}
      <button onClick={()=>navigate("/admin/courses/addcourse")} type="submit" className="btn btn-neutral w-full">
        Create
      </button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Status</th>
              <th>Description</th>
              <th>Course Catagory</th>
              <th></th>
            </tr>
          </thead>
           {data?.adminCourses.map((course)=>(
             
            <tbody key={course._id}>
            
            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{console.log(course)}{course?.courseTitle}</div>
                    {/* <div className="text-sm opacity-50">Brazil</div> */}
                  </div>
                </div>
              </td>
              <td>
              {course?.isPublish}
              </td>
              <td>
                Wyman-Ledner
                <br />
                <span className="badge badge-ghost badge-sm">
                  Community Outreach Specialist
                </span>
              </td>
              <td>{course?.courseCategory}</td>
              <td><button onClick={()=>navigate(`/admin/courses/course/${course?._id}`)} className="btn btn-neutral">Edite</button></td>
            </tr>
          </tbody>
            
           ))}
            
        </table>
      </div>
      <Outlet/>
    </div>
     </>
  );
}
