import React, { useState } from "react";


function FilterItem({item, handler}) {

  const [isActive, setIsActive] = useState(false);
 
  const buttonClassName = isActive ? "category-active" : "category";

  const clickHandler = () => {
    handler(item.subcategory)
    setIsActive(!isActive);
  }


  return (
    <button onClick={clickHandler} className={buttonClassName} key={item.id} id={`filter-${item.id}`}>
      <div className="image-container">
        <img className="image" src={item.img} alt='Some description' />
      </div>
      <div className="product-info">
         {item.description}
      </div>
    </button>
  );
}

export default FilterItem;
