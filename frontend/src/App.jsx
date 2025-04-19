import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import userApi from "./features/user/userApi";
import { login } from "./features/user/userSlice";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./pages/Admin/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import Courses from "./pages/Admin/Courses";
import AddCourse from "./components/AddCourse";
import CourseDatails from "./pages/Home/CourseDatails";
import Edite from "./components/Edite";
import Lectures from "./pages/Lectures/Lectures";
import EditeLecture from "./components/EditeLecture";
import LectureDettails from "./components/LectureDetails";
import CourseProgress from "./components/CourseProgress";
 
 
function App() {
  // const user  = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
   

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const result = await dispatch(userApi.endpoints.loadUser.initiate()).unwrap(); // Use unwrap() to handle errors
        if (result) {
          dispatch(login(result)); // Set user in Redux store
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    fetchUser()

  }, [dispatch]);


  return (
   
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/admin" element={<Sidebar/>}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="courses/addcourse" element={<AddCourse/>}></Route>
          <Route path="courses/course/:id" element={<Edite/>}></Route>
          <Route path="courses/course/:id/lecture" element={<Lectures/>}></Route>
          <Route path="courses/course/:courseId/lecture/:lectureId" element={<EditeLecture/>}></Route>
          <Route path="courses/course/:courseId/lecture/:lectureId/details" element={<LectureDettails/>}></Route>
      </Route>
       <Route path="/course-progress/:courseId" element={<CourseProgress/>}></Route>
       <Route path="courses/course/:id" element={<CourseDatails/>}></Route>
      </Routes>
    
  );
}

export default App;
