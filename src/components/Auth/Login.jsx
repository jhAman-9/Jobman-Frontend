// import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiRocket2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { isAutherized } from "../../store/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { autherized } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // const handleLogin = async (e) => {
  // e.preventDefault();
  // try {
  //   const response = await axios.post(
  //     "http://localhost:4000/api/v1/user/login",
  //     { email, role, password },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     }
  //   );
  //   setEmail("");
  //   setPassword("");
  //   setRole("");
  //   toast.success(response.data.message);
  //   dispatch(isAutherized(true));
  //   console.log("autherized value", autherized);
  // } catch (error) {
  //   toast.error(error.response?.data?.message);
  // }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is equivalent to `withCredentials: true` in axios
        body: JSON.stringify({ email, role, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setEmail("");
      setPassword("");
      setRole("");
      toast.success(data.message);
      dispatch(isAutherized(true));
      console.log("autherized value", autherized);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (autherized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>

          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select role</option>
                  <option value="Employee">Employee</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
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
            <button type="submit">Login</button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login-banner" />
        </div>
      </section>
    </>
  );
};

export default Register;
