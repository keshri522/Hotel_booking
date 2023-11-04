import axios from "axios";

const GetsingleHotel = async (id) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_REACT_API_URL}/singlehotel`,
      { id: id }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default GetsingleHotel;
