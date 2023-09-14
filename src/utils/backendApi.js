import axios from "axios";

const baseUrl = "http://localhost:5001/users";

function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");

    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
export const backendToken = getCookie("token");
export const fetchApi = async (url, params) => {
  try {
    const response = await axios.get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
        "Content-Type": "application/json",
      },
      params,
    });
    console.log("response---", response.data);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Axios error:", error);
  }
};
