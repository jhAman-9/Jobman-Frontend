import { FaUserPlus } from "react-icons/fa"
import { MdFindInPage } from "react-icons/md"
import { IoMdSend } from "react-icons/io"

const HowItWork = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3 className="text-4xl font-bold">How JobMan Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>create account</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident neque, rem eaque ipsum reprehenderit repellat!</p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>create account</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident neque, rem eaque ipsum reprehenderit repellat!</p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>create account</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident neque, rem eaque ipsum reprehenderit repellat!</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HowItWork