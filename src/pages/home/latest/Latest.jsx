import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchBtn from "../../../components/switchbtn/SwitchBtn";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/carousel";

function Latest() {
//   const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/movie/upcoming`);

//   const onTabChange = (tab) => {
//     setEndpoint(tab === "Movies" ? "movie" : "tv");
//   };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Latest</span>
        {/* <SwitchBtn data={["Movies"]}  /> */}
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
}

export default Latest;
