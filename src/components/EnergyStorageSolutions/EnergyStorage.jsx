import ThumbnailSale from "../Tumbnails/ThumbnailSale";
import Thumbnail from "../Tumbnails/Thumbnail";
import Filters from "../Filters/Filters";
import { signal} from "@preact/signals-react"

import React, { useEffect, useState } from "react";

const EnergyStorage = () => {

const idList = signal([]);

const EnergyStorage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])


  const settingIdList = (subcategory) => {
  
    const currentIdList = [...idList.value];

    const updatedIdList = currentIdList.includes(subcategory)
      ? currentIdList.filter(id => id !== subcategory)
      : [...currentIdList, subcategory];

    return {
      idList: updatedIdList
    };
  };

  const handler = (subcategory) => {  

    const { idList: newIdList } = settingIdList(subcategory); 

    idList.value = newIdList;       

  }

  useEffect(() => { 

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products/category/3");
        const json = await response.json();
  
        if (response.ok) {
          setData(json);
          
          setFilteredData( () => {
            const currentData = [...json];
            const currentIdList = [...idList.value];
      
            const filteredData = currentIdList.length > 0
              ? currentData.filter(product => currentIdList.includes(product.subcategory))
              : currentData;
      
            return filteredData;
          });

          }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();  

  
    
    // console.log("useEffect");
  }, [idList.value]);

  return (
    <div className="category-page">
      <Filters 
        title="Energy Storage Solutions"
        category={3}
        handler={handler}
      />
      <div className="product-container">

        {filteredData 
          ? filteredData.map((product) => {
            if (product.discount > 0) {
              return <ThumbnailSale {...product} key={product._id} />;
            } else return <Thumbnail {...product} key={product._id} />;
          })
          : (data && data.map((product) => {
            if (product.discount > 0) {
              return <ThumbnailSale {...product} key={product._id} />;
            } else return <Thumbnail {...product} key={product._id} />;
          }))
        }
      </div>

    </div>
  );
};

export default EnergyStorage;
