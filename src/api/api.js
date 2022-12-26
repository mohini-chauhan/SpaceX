import axios from "axios";
const getCapsuleData = () => {
  let url = "https://api.spacexdata.com/v3/capsules";
  return axios.get(url);
};

export default getCapsuleData;
