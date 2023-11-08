import axios from "axios";
// this function will send the opp to the backend

const SendOpt = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/forgotoptVerification`,
    { data: data }
  );
  return response;
};
export default SendOpt;
