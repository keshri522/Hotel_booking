import axios from "axios";
// this function will send the opp to the backend

const ForgotPasswordApi = async (email) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/forgotPassword`,
    { email: email }
  );
  return response;
};
export default ForgotPasswordApi;
