import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img
          src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg"
          alt="Page-Not-Found"
        />
        <Link to={"/"}>Return To Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
