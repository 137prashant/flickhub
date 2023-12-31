import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN;

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: {
        Authorization: "Bearer " + TMBD_TOKEN,
      },
      params,
    });

    return data;
  } catch (err) {
    return err;
  }
};


