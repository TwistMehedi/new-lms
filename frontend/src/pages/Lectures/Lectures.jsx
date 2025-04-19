import React, { useState } from "react";
import {
  useDeleteLectureMutation,
  useGetAllLectureQuery,
  useLectureCreateMutation,
} from "../../features/course/courseApi";
import { useNavigate, useParams } from "react-router";

export default function Lectures() {
  const [lectureTitle, setLectureTitle] = useState("");
  const { id } = useParams();
  console.log(id);

  const [deleteLecture] = useDeleteLectureMutation()
  
  const navigate = useNavigate();
  const [lectureCreate] = useLectureCreateMutation();
  const { data } = useGetAllLectureQuery(id);
//   console.log(data.course.leactures);

  const lecturHandler = async (e) => {
    e.preventDefault();
    try {
      await lectureCreate({ id, lectureTitle });
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={lecturHandler} className="space-y-4 p-4">
        <input
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          type="text"
          placeholder="Lecture title"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-neutral w-full">
          Create lecture
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-neutral w-full">
          Back
        </button>
      </form>
      <div>
        {data?.course?.leactures.map((lecture,index) => (
          <div key={lecture._id}>
            <h1>{index}: {lecture?.lectureTitle}</h1>
            <button onClick={()=>navigate(`${lecture._id}`)} className="btn">Edit lercture</button>
            <button onClick={()=>deleteLecture({id,lectureId:lecture._id})} className="btn">Delete lercture</button>
            <button onClick={()=>navigate(`${lecture._id}/details`)} className="btn">Details lercture</button>
          </div>
        ))}
      </div>
    </div>
  );
}
