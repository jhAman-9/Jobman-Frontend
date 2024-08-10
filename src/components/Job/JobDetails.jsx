import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";

const JobDetails = () => {
  const [job, setJob] = useState({}); // Because Single job will store
  const { autherized, user } = useSelector((store) => store.user);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleJobData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/job/${id}`, {
          credentials: "include",
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setJob(data.job);
        } else {
          throw new Error("Job Data Not Found");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (autherized) fetchSingleJobData();
  }, []);

  if (!autherized) return <Navigate to={"/login"} />;

  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3 className="text-2xl font-bold">Job Details</h3>
          <div className="banner">
            <p>
              Title : <span>{job.title}</span>
            </p>
            <p>
              Description : <span>{job.description}</span>
            </p>
            <p>
              Category : <span>{job.category}</span>
            </p>
            <p>
              City : <span>{job.city}</span>
            </p>
            <p>
              location : <span>{job.location}</span>
            </p>
            <p>
              Country : <span>{job.country}</span>
            </p>
            <p>
              Salary :
              <span>
              </span>
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            <p>
              Job Posted On : <span>{job.jobPostedOn}</span>
            </p>
            <p>
              {user && user.role === "Employee" ? (
                <></>
              ) : (
                <Link to={`/application/${job._id}`}>Apply Now</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
