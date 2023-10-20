import Spinner from "../Spinner/spinner";
const RegisterForm = ({
  formData,
  handleReset,
  handleChange,
  handleClikc,
  hanldeRoute,
  spinner,
  reset,
}) => {
  return (
    <div>
      <div className="form-floating mb-3 ">
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
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-control"
          id="floatingInput"
          placeholder="Enter your email"
          onChange={handleChange}
          required
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
      <div className="form-floating mb-3">
        <input
          type="password"
          name="cpassword"
          value={formData.cpassword}
          className="form-control"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingPassword">
          Confirm Password<span className="text-danger">*</span>
        </label>
      </div>
      <div className="d-flex justify-content-between">
        {spinner ? (
          <Spinner></Spinner>
        ) : (
          <button className="btn btn-primary mt-2" onClick={handleClikc}>
            Singup
          </button>
        )}
        {/* conditioal rendering of buttons */}
        {reset ? (
          <Spinner></Spinner>
        ) : (
          <button
            disabled={
              formData.name.length === 0 &&
              formData.email.length === 0 &&
              formData.password.length === 0 &&
              formData.cpassword.length === 0
            }
            className="btn btn-danger mt-2"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

        <label
          type="button"
          className=" mt-2 text-primary font-weight-bold"
          onClick={hanldeRoute}
          required
        >
          Dont't have account
        </label>
      </div>
    </div>
  );
};
export default RegisterForm;
