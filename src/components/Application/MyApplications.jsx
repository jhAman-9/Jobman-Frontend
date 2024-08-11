import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResumeModel from "./ResumeModel";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { JobSeekerApplicationsCard } from "./JobSeekerApplicationsCard.jsx";
import { EmplyeeApplicationsCard } from "./EmplyeeApplicationsCard.jsx";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const { autherized, user } = useSelector((store) => store.user);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Employee Applications
    if (user && user.role === "Employee") {
      const fetchEmployeeApplications = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/api/v1/application/employee/getall",
            {
              credentials: "include",
              method: "GET",
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            toast(errorData.message);
            throw new Error(errorData.message);
          }
          const data = await response.json();
          setApplications(data.applications);
          toast(data.message);
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchEmployeeApplications();
    }
    // Job Seeker Applications
    else if (user && user.role === "Job Seeker") {
      const fetchJobSeekerApplications = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/api/v1/application/jobseeker/getall",
            {
              credentials: "include",
              method: "GET",
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            toast(errorData.message);
            throw new Error(errorData.message);
          }

          const data = await response.json();
          setApplications(data.applications);
          toast(data.message);
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchJobSeekerApplications();
    }
  }, [autherized]);

  if (!autherized) {
    navigate("/login");
  }

  // Handle Delete Operation
  const handleDeleteApplication = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/application/jobseeker/delete/" + id,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
      }

      const data = await response.json();
      setApplications((prevApplication) =>
        prevApplication.filter((applications) => applications._id !== id)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Resume Open Function
  const openModel = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModelOpen(true);
  };

  // Resume Close Function
  const closeModel = () => {
    setResumeImageUrl("");
    setModelOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Employee" ? (
        <div className="container">
          <h3 className="font-bold text-2xl text-rose-700 text-center">
            My Application
          </h3>
          {applications.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl">No Application Found!</h1>
            </div>
          ) : (
            applications.map((element) => {
              return (
                <EmplyeeApplicationsCard
                  key={element._id}
                  element={element}
                  openModel={openModel}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h3 className="font-bold text-2xl text-rose-700 text-center">
            Job Seeker Applications
          </h3>

          {applications.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl">No Application Found!</h1>
            </div>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerApplicationsCard
                  key={element._id}
                  element={element}
                  handleDeleteApplication={handleDeleteApplication}
                  openModel={openModel}
                />
              );
            })
          )}
        </div>
      )}

      {modelOpen && (
        <ResumeModel imageURL={resumeImageUrl} onClose={closeModel} />
      )}
    </section>
  );
};

export default MyApplications;
