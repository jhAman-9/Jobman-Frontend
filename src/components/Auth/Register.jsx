// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiRocket2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const { isAutherized } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const res = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/user/register",
        {
          headers: myHeaders,
          method: "POST",
          body: JSON.stringify({ name, email, phone, password, role }),
        }
      );
      console.log(res.status);

      const json = await res.json();

      toast.success(json.data.message);
      setName("");
      setName("");
      setPhone("");
      setRole("");
      setPassword("");

      dispatch(isAutherized(true));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error :", error);
    }
  };

  if (isAutherized) {
    return navigate("/");
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Create a new account</h3>
            <form>
              <div className="inputTag">
                <label>Register As</label>
                <div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select role</option>
                    <option value="Employee">Employee</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>
              <div className="inputTag">
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                  />
                  <FaPencilAlt />
                </div>
              </div>
              <div className="inputTag">
                <label>Email</label>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>
              <div className="inputTag">
                <label>Phone Number</label>
                <div>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0123456789"
                  />
                  <FaPhoneFlip />
                </div>
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                  <RiRocket2Fill />
                </div>
              </div>
              <button type="submit" onClick={handleRegister}>
                Register
              </button>
              <Link to={"/login"}>Login Now</Link>
            </form>
          </div>
          <div className="banner">
            <img src="/register.png" alt="register-banner" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
