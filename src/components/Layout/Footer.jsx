import { useSelector } from "react-redux";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  const { autherized } = useSelector((store) => store.user);
  return (
    <footer className={autherized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved to Aj</div>
      <div>
        <Link to={"/"} target="_blank">
          <FaFacebookF />{" "}
        </Link>
        <Link to={"/"} target="_blank">
          <FaYoutube />{" "}
        </Link>
        <Link to={"/"} target="_blank">
          <FaLinkedin />{" "}
        </Link>
        <Link to={"/"} target="_blank">
          <RiInstagramFill />{" "}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
