import Spinner from "../Spinner/spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const LoginForm = ({ formData, handleChange, handleClikc, spinner }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        {/* <div className="form-floating mb-3 ">
          <input
            type="text"
            name="name"
            value={formData.name}
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingPassword">
            Name<span className="text-danger">*</span>
          </label>
        </div> */}
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            className="form-control"
            id="floatingInput"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">
            Email address<span className="text-danger">*</span>
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingPassword">
            Password<span className="text-danger">*</span>
          </label>
        </div>
        {/* condtional rendering of button  */}
        <div className="d-flex flex-column justify-content-between">
          {spinner ? (
            <Spinner></Spinner>
          ) : (
            <button className="btn btn-primary mt-2 mb-2" onClick={handleClikc}>
              Login
            </button>
          )}
          {/* <label
            style={{ backgroundColor: "blue" }}
            type="button"
            className="mt-2 tt "
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account
          </label> */}

          <Link to="/register" style={{ color: "blue" }} className="mt-2 tt">
            Don't have an account
          </Link>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
