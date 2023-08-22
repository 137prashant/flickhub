import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchBtn from "../../../components/switchbtn/SwitchBtn";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/carousel";

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
