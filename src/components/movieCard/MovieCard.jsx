import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data?.media_type || mediaType}/${data?.id}`)}
    >
      <div className="posterBlock">
        <img className="posterImg" src={posterUrl} alt="poster img!" />
          <CircleRating rating={data?.vote_average.toFixed(1)} />
          <Genres data={data?.genre_ids.slice(0, 2)} />
      </div>
      <div className="textBlock">
        <span className="title">{data?.title || data?.name}</span>
        <span className="date">
          {dayjs(data?.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
