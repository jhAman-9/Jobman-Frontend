import PropTypes from "prop-types";

export const JobSeekerApplicationsCard = ({
  element,
  handleDeleteApplication,
  openModel,
}) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name : </span>
            {element?.name}
          </p>
          <p>
            <span>Email : </span>
            {element?.email}
          </p>
          <p>
            <span>Phone : </span>
            {element?.phone}
          </p>
          <p>
            <span>Address : </span>
            {element?.address}
          </p>
          <p>
            <span>Cover Letter: </span>
            {element?.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModel(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => handleDeleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

// To fix error that element is missing in the prop validation
JobSeekerApplicationsCard.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    coverLetter: PropTypes.string,
    resume: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    _id: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteApplication: PropTypes.func.isRequired,
  openModel: PropTypes.func.isRequired,
};

