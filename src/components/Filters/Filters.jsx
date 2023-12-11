import React from "react";
import FilterItem from "./FilterItem";
import filterData from "../../models/filterData";
import "./filters.css";

const Filters = ({title, category, handler}) => {

  const data = filterData.filter(item => item.category === category);

  return (
    <div className="filters">
      
        <div className="most-popular-title">
          <h1>{title}</h1>
        </div>
        <div className="most-popular-container">
          {data.map((item) => {
            return <FilterItem item={item} handler={handler} key={item.id}/>;
          })}
        </div>
      
    </div>
  );
};

export default Filters;
