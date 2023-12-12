import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const LikedItem = ({
  _id,
  img,
  productName,
  description,
  price,
  handleDeleteFavorite,
}) => {
  const props = { _id, img, productName, description, price };
  return (
    <Link
      className="a-product"
      to={`/${_id}`}
      state={{ productDetails: props }}
    >
      <li className="liked-item-wrapper">
        <div className="liked-item">
          <img className="liked-item-img" src={img} alt={productName} />
          <div className="liked-item-info">
            <div className="flex space-between vertically-center">
              <h4>{productName}</h4>
              <FaHeart size={15} style={{ color: "var(--mainthird)" }} />
            </div>
            <p className="liked-item-description">{description}</p>
            <div className="flex space-between vertically-center">
              <p>
                <strong>${price}</strong>
              </p>
              <IoTrashOutline
                size={20}
                style={{ color: "red" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteFavorite(_id);
                }}
              />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default LikedItem;
