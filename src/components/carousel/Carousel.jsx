import React, { useRef } from "react";
import "./style.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";

import CircleRating from "../circleRating/CircleRating";

import Genres from "../genres/Genres";

function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
      <div className="carousel">
        <ContentWrapper>
          {title && <div className="carouselTitle">{title}</div>}
          <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={() => navigation("left")}
          />
          <BsFillArrowRightCircleFill
            className="carouselRightNav arrow"
            onClick={() => navigation("right")}
          />
          {!loading ? (
            <div className="carouselItems" ref={carouselContainer}>
              {data?.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                const roundedRating = item.vote_average.toFixed(1);
                const mediaType = item.media_type || endpoint;
                return (
                  <div
                    key={item.id}
                    className="carouselItem"
                    onClick={() => navigate(`/${mediaType}/${item.id}`)}
                  >
                    <div className="posterBlock">
                      <img src={posterUrl} alt="poster img!"/>

                      <CircleRating rating={roundedRating} />

                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </ContentWrapper>
      </div>
  );
}

export default Carousel;
