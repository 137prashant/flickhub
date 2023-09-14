import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import PosterFallback from "../../../assets/no-poster.png";
import { Playbtn } from "../playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import axios from "axios";
import { backendToken, fetchApi } from "../../../utils/backendApi";
import { updateLikeCount } from "../../../store/likeSlice";

const DetailsBanner = ({ video, crew }) => {
  const dispatch = useDispatch();

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { url } = useSelector((state) => state.home);
  const [likes, setLikes] = useState(false);
  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");

  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writter"
  );

  useEffect(() => {
    fetchMovieLike();
  }, [data, likes]);

  const requestData = {
    movieId: id,
    movieType: mediaType,
  };

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const saveMovie = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/users/savemovie",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${backendToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLikes(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieLike = () => {
    fetchApi("/getmovie")
      .then((res) => {
        dispatch(updateLikeCount(res.likedMovie.length));
        const movieIsLiked = res.likedMovie.some((likedMovie) => {
          return (
            likedMovie.movieId === id && likedMovie.movieType === mediaType
          );
        });
        if (movieIsLiked === true) {
          setLikes(true);
        } else {
          setLikes(false);
        }
      })
      .catch((error) => {
        console.log("fetchMovieData", error);
      });
  };

  const deleteMovie = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5001/users/deletemovie",
        {
          data: requestData,
          headers: {
            Authorization: `Bearer ${backendToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLikes(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fav = () => {
    if (likes) {
      deleteMovie();
    } else {
      saveMovie();
    }
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <img src={url.poster + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.backdrop_path ? (
                      <img
                        className="posterImg"
                        src={url.poster + data?.poster_path}
                      />
                    ) : (
                      <img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>

                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <Playbtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="like" onClick={fav}>
                        {likes ? <FcLike /> : <FcLikePlaceholder />}
                      </div>
                    </div>
                    <div className="description">{data?.overview}</div>
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:</span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:</span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
