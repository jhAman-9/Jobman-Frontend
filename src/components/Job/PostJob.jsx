/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [location, setLoaction] = useState("");
  const [country, setCountry] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const { autherized, user } = useSelector((store) => store.user);

  const handleJobPost = async (e) => {
    e.preventDefault();

    try {
      if (salaryType == "Fixed Salary") {
        setSalaryFrom("");
        setSalaryTo("");
      } else if (salaryType === "Ranged Salary") {
        setFixedSalary("");
      } else {
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary("");
      }

      const response = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/job/postjob",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            fixedSalary.length >= 4
              ? {
                  title,
                  description,
                  city,
                  category,
                  country,
                  location,
                  fixedSalary,
                }
              : {
                  title,
                  description,
                  city,
                  country,
                  category,
                  location,
                  salaryFrom,
                  salaryTo,
                }
          ),
        }
      );
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }

      const data = await response.json();
      setCategory("");
      setCity("");
      setCountry("");
      setDescription("");
      setTitle("");
      setLoaction("");
      setFixedSalary("");
      setSalaryFrom("");
      setSalaryTo("");

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!autherized || user.role !== "Employee") return <Navigate to={"/"} />;

  return (
    <div className="job_post page">
      <div className="container">
        <h3>Post A New Job</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="MERN Developer">MERN Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="Mobile App Developer Developer">
                Mobile App Developer
              </option>
              <option value="Dot Net Developer">Dot Net Developer</option>
              <option value="Angular Developer">Angular Developer</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="AI & ML">AI & ML</option>
              <option value="Movile Game Developer">
                Movile Game Developer
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="Data Entry Operation">Data Entry Operation</option>
              <option value="PHP Developer">PHP Developer</option>
              <option value="Graphics & Design">Graphics & Design</option>
            </select>
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Job City"
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Job Country"
            />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLoaction(e.target.value)}
            placeholder="Job Location"
          />
          <div className="salary_wrapper">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="">Default</option>
              <option value="Ranged Salary">Ranged Salary</option>
              <option value="Fixed Salary">Fixed salary</option>
            </select>
            <div>
              {salaryType === "Default" ? (
                <p>Please Provide a Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  name="fixed_Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  placeholder="Please Provide Salary"
                />
              ) : (
                <div className="ranged_salary">
                  <input
                    type="number"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    placeholder="123456789"
                  />
                  <input
                    type="number"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    placeholder="123456789"
                  />
                </div>
              )}
            </div>
          </div>
          <textarea
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
