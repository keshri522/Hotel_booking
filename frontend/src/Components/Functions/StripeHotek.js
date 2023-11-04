import axios from "axios";
// this function wil\create hotel in database

const StripeHotel = async (token, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_REACT_API_URL}/bookhotel`,
    { data: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export default StripeHotel;
