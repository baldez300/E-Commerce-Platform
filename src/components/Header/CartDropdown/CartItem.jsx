import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";

const cartItem = ({ _id, img, productName, description, price, removeFromCart, quantity }) => {
  const props = { _id, img, productName, description, price };
  return (
    <Link
      className="a-product"
      to={`/${_id}`}
      state={{ productDetails: props }}
    >
      <li className="cart-item-wrapper">
        <div className="cart-item">
          <img className="cart-item-img" src={img} alt={productName} />
          <div className="cart-item-info">
            <h4>{productName}</h4>
            <p className="cart-item-description">{description}</p>
            <div className="flex space-between vertically-center">
              <p>
                <p style={{fontSize: "14px"}}>{price}$ * {quantity}  <span style={{fontSize: "20px"}}><strong>${(price*quantity).toFixed(2)}</strong></span></p>
              </p>
              <IoTrashOutline
                size={20}
                style={{ color: "red" }}
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(_id);
                }}
              />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default cartItem;
