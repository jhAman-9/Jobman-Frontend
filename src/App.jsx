// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import MyApplications from "./components/Application/MyApplications";
import Application from "./components/Application/Application";
import NotFound from "./components/Not Found/NotFound";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { addUser, isAutherized } from "./store/userSlice";
import "./App.css";
// import axios from "axios";

const App = () => {
  const { autherized } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await axios.get(
        //   "https://jobman-ve25.onrender.com/api/v1/user/profile",
        //   {
        //     withCredentials: true,
        //   }
        // );
        // dispatch(addUser(response.data.user));
        // dispatch(isAutherized(true));

        const response = await fetch(
          "https://jobman-ve25.onrender.com/api/v1/user/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          dispatch(addUser(data.user));
          dispatch(isAutherized(true));
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
        dispatch(isAutherized(false));
      }
    };
    fetchUser();
  }, [autherized]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/myjobs" element={<MyJobs />} />
          <Route path="/application/getall" element={<MyApplications />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;
