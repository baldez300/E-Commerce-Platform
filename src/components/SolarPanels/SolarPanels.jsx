import ThumbnailSale from "../Tumbnails/ThumbnailSale";
import Thumbnail from "../Tumbnails/Thumbnail";
import Filters from "../Filters/Filters";
import { signal} from "@preact/signals-react"
import React, { useState, useEffect} from "react";


const idList = signal([]);


const SolarPanels = () => {
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
        const response = await fetch("http://localhost:4000/products/category/2");
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
  },[idList.value]);

 
  // console.log("data", data);
  // console.log("id List", idList.value);
  // console.log("filtered data", filteredData);
  // console.log("filtered data length", filteredData.length);

  return (
    <div className="category-page">
      <Filters 
        title="Solar Panels"
        category={2}
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

export default SolarPanels;
