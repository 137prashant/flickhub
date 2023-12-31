import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

function Latest() {
  const { data, loading } = useFetch(`/movie/upcoming`);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Latest</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={"movie"} />
    </div>
  );
}

export default Latest;
