import React from "react";
import { useHistory } from "react-router-dom";

export default function RestaurantBrief(props) {
  const { briefs } = props;
  let history = useHistory();
  const onImgClicked = () => {
    history.push(`/restaurant/${briefs.id}`);
  };

  return (
    <div>
      <img
        src={briefs.url}
        style={{ width: "240px", height: "240px", cursor: "pointer" }}
        onClick={onImgClicked}
      />
      <p>{briefs.name}</p>
    </div>
  );
}
