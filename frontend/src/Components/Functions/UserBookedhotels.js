import axios from "axios";

const LoginUserHotels = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_REACT_API_URL}/loginUserhotels`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default LoginUserHotels;
