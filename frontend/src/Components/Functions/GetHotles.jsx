import axios from "axios";

const Gethotels = async (page) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_REACT_API_URL}/getHotels`,
      {
        params: {
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default Gethotels;
