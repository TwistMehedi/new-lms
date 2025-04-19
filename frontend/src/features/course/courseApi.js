import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/course/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "create-course",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: courseData,
      }),
    }),
    //get admin courses
    getCreatoreCourse: builder.query({
      query: () => ({
        url: "get-admin-courses",
        method: "GET",
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "courses",
        method: "GET",
      }),
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `${id}`,
        method: "GET",
      }),
    }),
    courseUpdate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `update/course/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    lectureCreate: builder.mutation({
      query: ({ id, lectureTitle }) => ({
        url: `${id}/lecture`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:{lectureTitle},
      }),
    }),
    getAllLecture:builder.query({
        query:(id)=>({
            url:`${id}/lecture`,
            method:"GET"
        })
    }),
     lectureUpdate:builder.mutation({
        query:({courseId,lectureId,formData})=>({
            url:`${courseId}/lecture/${lectureId}`,
            method:"PUT",
            body:formData
        })
    }),
    deleteLecture:builder.mutation({
      query:({id,lectureId})=>({
        url:`${id}/lecture/${lectureId}`,
        method:"DELETE",
      })
    }),
    getLectureById:builder.query({
      query:({courseId,lectureId})=>({
        url:`${courseId}/lecture/${lectureId}`,
        method:"GET"
      })
    }),
    publishCourse:builder.mutation({
      query:({courseId,query})=>({
        url:`${courseId}/publish?publish=${query}`,
        method:"PUT",
      })
    })
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatoreCourseQuery,
  useGetAllCourseQuery,
  useGetCourseQuery,
  useCourseUpdateMutation,
  useLectureCreateMutation,
  useGetAllLectureQuery,
  useLectureUpdateMutation,
  useDeleteLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation
} = courseApi;
export default courseApi;
