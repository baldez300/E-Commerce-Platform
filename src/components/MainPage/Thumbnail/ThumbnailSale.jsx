import favorit from "../../../images/products/favorit.png";
import { Link } from "react-router-dom";
//import { handleFavoriteBtnClicked } from "../Header/FavoritesDropdown";
import useFavorites from "../../../hooks/useFavorites";

import { currentUser } from "../../../App";

function ThumbnailSale(props) {
  const { handleFavoriteBtnClicked } = useFavorites();
  const { _id, img, productName, price, manufacturer, country, discount } =
    props;

  function ifFavorite() {
    // check if the product is already in the favorites
    if (currentUser.value && currentUser.value.favorites)
      return currentUser.value.favorites.find(
        (favorite) => favorite._id === _id
      );
  }

  return (
    <div className="product" key={_id}>
      <Link
        className="a-product"
        to={`/${_id}`}
        state={{ productDetails: props }}
      >
        <div className="favorite pointer">
          <img
            src={favorit}
            alt="favorit"
            style={
              currentUser.value && ifFavorite()
                ? { backgroundColor: "var(--mainthird)" }
                : {}
            }
            id={`favorite-${_id}`}
            onClick={(e) => {
              e.preventDefault();
              handleFavoriteBtnClicked(props);
            }}
          />
        </div>
            <img className="img product-img" src={img} alt="product" />
            <div className="productName text-wrapper">
              <strong>{productName}</strong>
            </div>
            <div className="text-wrapper-3 manufacturer">
              <span className="manufacturer">Manufacturer: </span>
              <strong>{manufacturer}</strong>
            </div>
            <div className="text-wrapper-3 country">
              <span className="country">Country of origin: </span>
              <strong>{country}</strong>
            </div>
       </Link>
        <div className="ofer">
          
            <div className="price">
              $ {price && (price - price * discount).toFixed(0)}{" "}
              <span className="old-price">$ {price && price.toFixed(0)} </span>
            </div>
            <div className="discount">
              <div className="discount-sub">
                <strong>-{discount * 100}</strong> %
              </div>
            </div>
         
        </div>
      
    </div>
  );
}

export default ThumbnailSale;
