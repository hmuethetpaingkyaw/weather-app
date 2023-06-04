import axios from "axios";
import { getToken } from "../utils/cache";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const apiCall = async (url, method ,data, isWeatherApi = false) => {
  
  const token = await getToken();

  if(!isWeatherApi && token) {
    headers.Authorization = `Bearer ${token}`;
  } 
  axios.defaults.headers = headers;
  
  if(isWeatherApi) {
    axios.defaults.headers = 'something';
  }
   return await axios[method](url, data)
      .then(function (response) {
        return response;
      });
}
