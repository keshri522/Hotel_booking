import axios from "axios";
// this function wil\create hotel in database

const CreateHotels = async (token, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/create_hotels`,
    { data: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export default CreateHotels;
