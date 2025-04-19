import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { useGetAllCourseQuery } from "../../features/course/courseApi";
import {useNavigate} from "react-router"
 

export default function ProductList () {
  const {data} = useGetAllCourseQuery();
  console.log(data);
  const navigate = useNavigate()
  
  return (
     <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Products</h2>

        <div className="flex p-4">
        
        {/* Sidebar Filters */}
        <aside className="w-1/4 p-4 border-r">
          <h2 className="text-lg font-bold mb-2">Color</h2>
          <div className="flex flex-col gap-2">
            {['White', 'Beige', 'Black', 'Brown', 'Green', 'Purple'].map(color => (
              <label key={color} className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                {color}
              </label>
            ))}
          </div>
          <h2 className="text-lg font-bold mt-4 mb-2">Category</h2>
          <div className="flex flex-col gap-2">
            { data?.courses.map(course=>(
             <label key={course?._id} className="cursor-pointer flex items-center gap-2">
                 <input type="checkbox" className="checkbox" />
                  {course?.courseCatagory}
               </label>
            ))
// ['All New Arrivals', 'Tees', 'Crewnecks', 'Sweatshirts', 'Pants & Shorts'].map(category => (
//   <label key={category} className="cursor-pointer flex items-center gap-2">
//     <input type="checkbox" className="checkbox" />
//     {category}
//   </label>
// ))

            }
          </div>
          <h2 className="text-lg font-bold mt-4 mb-2">Sizes</h2>
          <div className="flex flex-col gap-2">
            {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => (
              <label key={size} className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                {size}
              </label>
            ))}
          </div>
        </aside>
  
        {/* Products Display */}
        <div className="w-3/4 p-4 grid grid-cols-3 gap-6">
          {data?.courses.map((course) => (
            <div key={course?._id} className="card bg-base-100 shadow-md p-4">
              <img src={course?.image} alt={course?.courseTitlle} className="w-full h-48 bg-gray-200" />
              <div className="p-2">
                <h3 className="font-bold text-lg">{course?.courseTitlle}</h3>
                <p className="text-gray-600">{course.colors}</p>
                <p className="text-primary font-semibold">{course.price}</p>
                <button onClick={()=>navigate(`courses/course/${course?._id}`)} className="btn btn-primary mt-2">Add to Cart</button>
              </div>
            </div>
          ))}
    
          <Pagination />
        </div>
         
      </div>
     </div>
  );
};
