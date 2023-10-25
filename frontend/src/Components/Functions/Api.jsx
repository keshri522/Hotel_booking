import axios from "axios";
// this function wil send stripe request to backend

const CreateHotels = async (token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/create_connect_account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export default CreateHotels;
