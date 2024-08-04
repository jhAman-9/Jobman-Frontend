import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAutherized, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/user/logout"
      );
      const json = await res.json(json.data.message);
      toast.success();
      navigate("/login");
    } catch (error) {
      toast.error(error.json.data.message);
      dispatch(isAutherized(true));
    }
  };

  return (
    <>
      <nav className={isAutherized ? "navbarShow" : "navbarHide"}>
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
            <Link to={"/application/getall"} onClick={() => setShow(false)}>
              {user && user.role === "Employee"
                ? "APPLICANT APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
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
