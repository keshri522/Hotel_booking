import axios from "axios";
const Hoteldelte = async (token, id) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_REACT_API_URL}/deleteBookedHotel`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
export default Hoteldelte;
