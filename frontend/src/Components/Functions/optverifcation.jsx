import axios from "axios";
// this function will send the opp to the backend

const OptApi = async (token, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/optverification`,
    { data: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export default OptApi;
