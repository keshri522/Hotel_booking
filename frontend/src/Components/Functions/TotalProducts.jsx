import axios from "axios";

const TotalProducts = async () => {
  const totalProducts = await axios.get(
    `${process.env.REACT_APP_REACT_API_URL}/totalhotels`
  );
  return totalProducts;
};
export default TotalProducts;
