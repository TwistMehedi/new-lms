import React, { useState } from "react";
import { useParams } from "react-router";
import { useLectureUpdateMutation } from "../features/course/courseApi";

export default function EditeLecture() {
  const [lectureTitle, setLectureTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { courseId, lectureId } = useParams();
  // console.log(courseId,lectureId);

  const [lectureUpdate] = useLectureUpdateMutation();
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(file);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("lectureTitle", lectureTitle);
    formData.append("file", videoUrl);
    setMediaProgress(true);
    await lectureUpdate({
      courseId,
      lectureId,
      formData,
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percent);
      },
    });
  };

  return (
    <div>
      <form onSubmit={updateHandler} className="space-y-4 p-4">
        <input
          onChange={(e) => setLectureTitle(e.target.value)}
          value={lectureTitle}
          type="text"
          placeholder="Course title"
          className="input input-bordered w-full"
        />

        <input
          onChange={handleVideoChange}
          type="file"
          accept="video/*"
          placeholder="Course title"
          className="input input-bordered w-full"
        />
        {mediaProgress && (
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >{uploadProgress}</div>
          </div>
        )}
        <button type="submit" className="btn btn-neutral w-full">
          Update Lecture
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-neutral w-full">
          Back
        </button>
      </form>
    </div>
  );
}
