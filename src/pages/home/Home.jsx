import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Tranding from "./trending/Tranding";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Latest from "./latest/Latest";

function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <Tranding />
      <Popular />
      <TopRated />
      <Latest />
    </div>
  );
}

export default Home;
