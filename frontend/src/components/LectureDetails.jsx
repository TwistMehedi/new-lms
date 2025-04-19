import React from "react";
import { useParams } from "react-router";
import { useGetLectureByIdQuery } from "../features/course/courseApi";

export default function LectureDetails() {
  const { courseId, lectureId } = useParams();
  console.log(courseId, lectureId);
  const { data } = useGetLectureByIdQuery({ courseId, lectureId });
  console.log(data);
  const lecture = data?.lecture;
  return (
    <div>
      {lecture?.lectureTitle}
      {lecture?.videoUrl?.url && (
        <video width="400" height="200" controls>
          <source src={lecture?.videoUrl?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
