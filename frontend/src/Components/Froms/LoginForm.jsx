const LoginForm = ({ fromData, handleChange, handleClikc }) => {
  return (
    <div>
      <div className="form-floating mb-3 ">
        <input
          type="text"
          name="name"
          value={fromData.name}
          className="form-control"
          placeholder="Enter your name"
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          value={fromData.email}
          className="form-control"
          id="floatingInput"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          name="password"
          value={fromData.password}
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="btn btn-primary mt-2" onClick={handleClikc}>
        Submit
      </button>
    </div>
  );
};
export default LoginForm;
