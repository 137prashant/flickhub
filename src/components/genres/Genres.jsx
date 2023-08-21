import React from "react";
import "./style.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Genres({ data }) {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((g) => {
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
