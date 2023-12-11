import ThumbnailSale from "../Tumbnails/ThumbnailSale";
import Thumbnail from "../Tumbnails/Thumbnail";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";



const SubcategoryPage = () => {
  const [data, setData] = useState([]);
  const { state } = useLocation();

  const props = state ? state : {};


  useEffect(() => { 

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products/category/${props.category}/${props.subcategory}`);
        const json = await response.json();
  
        if (response.ok) {
          setData(json);
           }
           console.log(props.category, props.subcategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();   
    
    // console.log("useEffect");
  }, [props]);

 
  // console.log("data", data);
  // console.log("id List", idList.value);
  // console.log("filtered data", filteredData);
  // console.log("filtered data length", filteredData.length);

  return (
    <div className="category-page">
      <div className="most-popular-title">
          <h1>{props.description}</h1>
      </div>
      <div className="product-container">

        {data && data.map((product) => {
            if (product.discount > 0) {
              return <ThumbnailSale {...product} key={product._id} />;
            } else return <Thumbnail {...product} key={product._id} />;
          })
        }
      </div>

    </div>
  );
};

export default SubcategoryPage;
