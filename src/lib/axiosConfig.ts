import axios from "axios";

// /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
// /!\    only used for our apis, not for external apis    /!\
// /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\

const axiosInstance = (jwt?: string) =>
  axios.create({
    baseURL: "http://middleware.lihoco.fr/api",
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    //   headers: { "X-Custom-Header": "foobar" },
  });

export { axiosInstance };
