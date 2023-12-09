import { useState, useEffect } from "react";
import { signal } from "@preact/signals-react";
import { useParams } from "react-router-dom";
import Thumbnail from "../Tumbnails/Thumbnail";
import ThumbnailSale from "../Tumbnails/ThumbnailSale";
import useProducts from "../../hooks/useProducts";
import "./SearchPage.css";
import { textForHeader } from "../Header/Header";

export const searchError = signal("");
export const searching = signal(false);

function SearchPage() {
  const { query } = useParams();
  const { searchForProducts } = useProducts();
  const [data, setData] = useState([]);
  
 

  useEffect(() => {
    searching.value = true;
    searchError.value = "";
    setData([]);
    const fetchData = async () => {
      const result = await searchForProducts(query);
      if (result) setData(result);
      searching.value = false;
    };

    fetchData();
  }, [query, searchForProducts]);

  return (
    <div className="category-page">
      <div className="most-popular-title">
          {textForHeader.value && <h2>Seach results for: "{textForHeader.value}"</h2>}
        </div>
      <div className="product-container">
        {searchError.value && <p className="error">{searchError.value}</p>}
        {!searching.value &&
          data.length > 0 &&
          data.map((product) => {
            if (product.discount > 0)
              return (
                <ThumbnailSale
                  {...product}
                  {...product}
                  img={`../${product.img}`}
                  key={product._id}
                />
              );
            else
              return (
                <Thumbnail
                  {...product}
                  img={`../${product.img}`}
                  key={product._id}
                />
              );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
