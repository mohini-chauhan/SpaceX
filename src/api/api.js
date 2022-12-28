import axios from "axios";
const getCapsuleData = (queryParams) => {
  let url = `https://api.spacexdata.com/v3/capsules${queryParams}`;
  return axios.get(url);
};

export default getCapsuleData;
