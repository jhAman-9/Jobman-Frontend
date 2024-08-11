import PropTypes from "prop-types";

const ResumeModel = ({ imageURL, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageURL} alt="resume" />
      </div>
    </div>
  );
};

// To fix error that element is missing in the prop validation
ResumeModel.propTypes = {
  imageURL: PropTypes.string.isRequired, // Make imageURL a required prop
  onClose: PropTypes.func.isRequired,
};

export default ResumeModel;
