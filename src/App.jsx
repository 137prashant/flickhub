import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfig, getGenres } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

import Register from "./pages/loginPage/register/Register";
import Login from "./pages/loginPage/login/Login";
import Like from "./pages/like/Like";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { fetchApi } from "./utils/backendApi";
import { updateLikeCount } from "./store/likeSlice";

function App() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchBackendData();
    fetchMovieData();
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchBackendData = () => {
    fetchApi("/user")
      .then((res) => {
        if (res) {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        const currentUrl = window.location.href;
        const baseUrl = window.location.origin;
        const pathSegments = currentUrl
          .replace(baseUrl, "")
          .split("/")
          .filter(Boolean);
        console.log("notok - ", pathSegments[0]);
        if (pathSegments[0] === "login") {
          return;
        }
        window.location.assign("/login");
        console.error("Fetch error:", error);
      });
  };

  const fetchMovieData = () => {
    fetchApi("/getmovie")
      .then((res) => {
        dispatch(updateLikeCount(res.likedMovie.length));
      })
      .catch((error) => {
        console.log("fetchMovieData", error);
      });
  };

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        poster: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfig(url));
    });
  };

  const genresCall = async () => {
    let promiss = [];
    let allGenres = {};
    let endPoint = ["tv", "movie"];

    endPoint.forEach((url) => {
      promiss.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promiss);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/like" element={<Like />} />
              <Route path="/:mediaType/:id" element={<Details />} />
              <Route path="/search/:query" element={<SearchResult />} />
              <Route path="/explore/:mediaType" element={<Explore />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
