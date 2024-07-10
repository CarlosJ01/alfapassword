import React from "react";

import "../../../css/minicard.css";

const MiniCard = ({ data, show }) => {
  return (
    <div
      className="card-mini"
      onClick={() => {
        show(data);
      }}
    >
      <h4>{data.nombre}</h4>
    </div>
  );
};

export default MiniCard;
