import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { autherized, user } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await fetch(
          "https://jobman-ve25.onrender.com/api/v1/job/myjobs",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setMyJobs([]);
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setMyJobs(data.myJobs);
        toast(data.message);
      } catch (error) {
        toast(error.message);
      }
    };
    fetchMyJobs();
  }, []);

  if (!autherized || !user.role === "Job Seeker") return <Navigate to={"/"} />;

  const handleEnableEditingMode = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEditingMode = () => {
    setEditingMode(null);
  };

  // Function to Update Job
  const handleUpdateJob = async (jobId) => {
    const UpdateThisJob = myJobs.find((job) => job._id === jobId);
    try {
      const response = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/job/update/" + jobId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(UpdateThisJob),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      toast(data.message);
    } catch (error) {
      toast(error.message);
    }
  };

  // Function to Delete Job
  const handleJobDelete = async (jobId) => {
    try {
      const response = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/job/delete/" + jobId,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setMyJobs((prevJobs) => prevJobs.filter((jobs) => jobs._id !== jobId)); // for removing deleted job from screen
      toast(data.message);
    } catch (error) {
      toast(error.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  console.log(myJobs);

  return (
    <div className="myJobs page">
      <div className="container">
        <h3>Your Posted Jobs</h3>
        {myJobs && myJobs.length > 0 ? (
          <>
            <div className="banner">
              {myJobs.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div className="">
                          <span>Title : {}</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="">
                          <span>Country : {}</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="">
                          <span>City : {}</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="">
                          <span>Category : {}</span>
                          <select
                            value={element.category}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Category</option>
                            <option value="MERN Developer">
                              MERN Developer
                            </option>
                            <option value="Java Developer">
                              Java Developer
                            </option>
                            <option value="Mobile App Developer Developer">
                              Mobile App Developer
                            </option>
                            <option value="Dot Net Developer">
                              Dot Net Developer
                            </option>
                            <option value="Angular Developer">
                              Angular Developer
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="AI & ML">AI & ML</option>
                            <option value="Movile Game Developer">
                              Movile Game Developer
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="Data Entry Operation">
                              Data Entry Operation
                            </option>
                            <option value="PHP Developer">PHP Developer</option>
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Salary :{" "}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                />{" "}
                                <input
                                  type="number"
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          <span>Expire : </span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description :</span>
                          <textarea
                            value={element.description}
                            rows={10}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expire",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          />
                        </div>
                        <div>
                          <span>Location :</span>
                          <textarea
                            value={element.location}
                            rows={10}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEditingMode()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEnableEditingMode(element._id)
                              }
                              className="edit_btn"
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleJobDelete(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>
            You have not Posted Any Job or You have deleted your all Posted
            Jobs..
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
