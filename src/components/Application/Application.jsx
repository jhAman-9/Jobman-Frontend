import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Application = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, SetCoverLetter] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setphone] = useState("");
  const [resume, setResume] = useState(null);

  const { user, autherized } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleResumeFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const handleFileInput = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const response = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/application/jobseeker/post",
        {
          credentials: "include",
          method: "POST",
          body: formData,

          // automatically select header..
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      setEmail("");
      setAddress("");
      setResume(null);
      setname("");
      setphone("");
      SetCoverLetter("");

      const data = await response.json();
      console.log(data);

      toast.success(data.message);
      navigate("/job/getall");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!autherized || (user && user.role === "Employee")) {
    navigate("/");
  }

  return (
    <>
      <section className="application">
        <div className="container">
          <h3 className="font-bold text-2xl text-rose-700 text-center">
            Application Form
          </h3>
          <form onSubmit={handleFileInput}>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Your Name"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <input
              type="number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              placeholder="123456789"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
            />
            <textarea
              value={coverLetter}
              onChange={(e) => SetCoverLetter(e.target.value)}
              placeholder="Provide Cover Letter"
            />
            <div>
              <label
                style={{ textAlign: "start", display: "block", font: "20px" }}
              >
                Attach Resume
              </label>
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={handleResumeFileChange}
                style={{ width: "100%" }}
                placeholder="Attach Resume"
              />
            </div>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Application;
