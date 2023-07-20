import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.post["Content-type"] = "application/json";

 

export const fetchData = (method, url, data, error) => {
    const token = localStorage.getItem("token");
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    
    }
    
    console.log(  headers["Authorization"] );
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
      error: error,
    });
};