import express from "express";
import { createCourse, createLecture, deleteCourse, getAdminCourse, getAllCourse, getCourse, getLecture, getLectureById, publishAndUnPublishCourse, removeLecture, updateCourse, updateLecture } from "../controller/courseController.js";
import upload from "../utils/multer.js";
import { isLoggedIn } from "../middlewere/isLoggedIn.js";
 
const router = express.Router();

router.route("/create-course").post(isLoggedIn,createCourse)
router.route("/delete/:id").delete(deleteCourse)
router.route("/courses").get(getAllCourse)
router.route("/get-admin-courses").get(isLoggedIn,getAdminCourse)
router.route("/update/course/:id").put(upload.single("courseThumbnail"),updateCourse)

router.route("/:id/publish").put(isLoggedIn, publishAndUnPublishCourse);

router.route("/:id").get(getCourse)
router.route("/:id/lecture").post(isLoggedIn,createLecture)
router.route("/:id/lecture").get(isLoggedIn,getLecture)
router.route("/:courseId/lecture/:lectureId").put(isLoggedIn,upload.single("file"),updateLecture)
router.route("/:courseId/lecture/:lectureId").delete(isLoggedIn,removeLecture);
router.route("/:courseId/lecture/:lectureId").get(isLoggedIn,getLectureById);


export default router;