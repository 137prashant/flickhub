import React from "react";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../hooks/useFetch";
import MovieCard from "../../components/movieCard/MovieCard";


const Like = () => {
  const { data, loading, error } = useFetch(
    `/movie/615656`
  );
  console.log("datata",data)

  if (data?.results?.length > 0) {
    return (
        <MovieCard  data={data} mediaType={movie} />
      );
  } else {
    return null;
  }
};

export default Like;
