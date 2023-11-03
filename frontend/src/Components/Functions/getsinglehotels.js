import axios from "axios";

const GetsingleHotel = async (token, id) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_REACT_API_URL}/singlehotel`,
      { id: id },
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

export default GetsingleHotel;
