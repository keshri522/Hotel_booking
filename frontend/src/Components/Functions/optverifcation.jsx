import axios from "axios";
// this function will send the opp to the backend

const OptApi = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/optverification`,
    { data: data }
  );
  return response;
};
export default OptApi;