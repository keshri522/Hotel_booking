import axios from "axios";

const DeleteHotel = async (token, id, page) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_REACT_API_URL}/deletehotel`,
      {
        id: id,
        page: page,
      },
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

export default DeleteHotel;
