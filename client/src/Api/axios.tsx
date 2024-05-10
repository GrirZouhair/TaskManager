import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://taskmanagerapi-production-a5e3.up.railway.app/api", // replace the url with your custom base URL or add an environment variable
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.response.use(null, (err) => {
  console.log(err);
});
