import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://middleware.lihoco.fr/api",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export { axiosInstance };
