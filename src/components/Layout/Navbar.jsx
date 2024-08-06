import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {removeUser } from "../../store/userSlice";
import axios from "axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { autherized, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      toast.error(error.json.data.message);
    }
  };

  return (
    <>
      <nav className={autherized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="JobZee-logos__white.png" alt="" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to={"/application/getall"} onClick={() => setShow(false)}>
                {user && user.role === "Employee"
                  ? "APPLICANT APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                All Jobs
              </Link>
            </li>
            {user && user.role == "Employee" ? (
              <li>
                <Link to={"/job/post"}>POST NEW JOB</Link>
              </li>
            ) : (
              <li>
                <Link to={"/job/myjobs"}>VIEW MY JOBS</Link>
              </li>
            )}
            <button onClick={handleLogOut}>LOGOUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
