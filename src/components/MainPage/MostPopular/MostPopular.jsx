import React from "react";
import "./MostPopular.css";
import MostPopularItem from "./MostPopularItem/MostPopularItem";
import popular from "../../../models/popularCategories";

const MostPopular = () => {

  
  return (
    <div className="most-popular">
      
        <div className="most-popular-title">
          <h2>Most popular items on the marketplace</h2>
        </div>
        <div className="most-popular-container">
          {popular.map((popular) => {
            return <MostPopularItem {...popular} key={popular.id}/>;
          })}
        </div>
      
    </div>
  );
};

export default MostPopular;
