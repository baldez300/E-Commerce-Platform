import products from "../../models/dataForSale";
// import products from "../../models/dataForSale";
import ThumbnailSale from "../Tumbnails/ThumbnailSale";
import Thumbnail from "../Tumbnails/Thumbnail";

import { useProductsContext } from "../../hooks/useProductsContext";

import React, { useEffect, useState } from "react";
import "../SalePage/Sale.css";

const EnergyStorage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/products/category/3");
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setData(json);
      }
    };
    fetchProducts();
    console.log("useEffect");
  }, []);

  return (
    <div className="category-page">
      <div className="product-container">
        {/* {productsToLoad.map((product) => {
            return <Thumbnail {...product} key={product.id} />              
            })} */}
        {data &&
          data.map((product) => {
            if (product.discount > 0) {
              return <ThumbnailSale {...product} key={product._id} />;
            } else return <Thumbnail {...product} key={product._id} />;
          })}
      </div>
      {/* <div>
            {end < filteredProducts.length ? (
                <button className="all-categories active-btn" onClick={loadHandler}><span>Load more</span></button>
            ) : null}
        </div>       */}
    </div>
  );
};

export default EnergyStorage;
