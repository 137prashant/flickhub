import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.poster +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    if (bg && isValidURL(bg)) {
      setBackground(bg);
    } else {
      setBackground("placeholder.jpg"); 
    }
  }, [data]);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <img src={background} alt="poster img!" />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV Show ."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  searchQueryHandler();
                }
              }}
            />
            <button
              onClick={() => {
                searchQueryHandler();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
