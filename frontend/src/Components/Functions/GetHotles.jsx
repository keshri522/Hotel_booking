import axios from "axios";

const Gethotels = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_REACT_API_URL}/getHotels`
  );
  return response;
};
export default Gethotels;
