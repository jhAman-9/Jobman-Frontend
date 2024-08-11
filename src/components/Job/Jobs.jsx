import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { autherized } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/job/getall",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const json = await response.json();
          setJobs(json.jobs);
        } else {
          throw new Error("Failed to Jobs data");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAllJobs();
  }, [autherized]);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[100%] m-4">
        <h1 className="text-4xl font-bold text-center text-black">All Jobs</h1>
        <div className="flex flex-wrap justify-center">
          {jobs.map((element) => {
            return (
              <div
                key={element._id}
                className="bg-[#a28089] w-72 h-56 my-2 mr-2 flex justify-center items-center rounded-xl hover:bg-[#ad6477]"
              >
                <div className="flex flex-col justify-center items-center p-4 text-center shadow-lg w-full h-full">
                  <div className="bg-[#12343b] text-[#fff5d7] w-2/3 h-1/3 flex justify-center items-center">
                    <span className="font-bold text-xl text-center">{element.title}</span>
                  </div>
                  <div className="bg-[#c89666] text-white w-full p-2 px-4 h-2/3  overflow-y-scroll">
                    <p className="text-sm">
                      Description : {element.description}{" "}
                    </p>
                    <h6 className="overflow-y-auto px-4 text-sm">
                      Location :{element.location}
                    </h6>
                  </div>
                  <Link
                    to={`/job/${element._id}`}
                    className="bg-[#ffaaab] text-black text-md p-1"
                  >
                    Job Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
