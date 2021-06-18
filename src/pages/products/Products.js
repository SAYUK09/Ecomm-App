import "./Products.css";
import { Link } from "react-router-dom";
import { useProductContext } from "../../contexts/Products-Context";
import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";
import { addToCart } from "../../pages/cart/Cart";
import {
  axiosAddToCart,
  axiosAddQty,
  cartClickHandler,
} from "../../utilty/cart-utility";
import {
  axiosAddToWishlist,
  wishClickHandler,
} from "../../utilty/wishlist-utility";
import { Sidebar } from "../../components/sidebar/sidebar";
import { useAuth } from "../../contexts/Auth-Context";
import { useToast } from "../../contexts/Toast-Context";

export function Products() {
  const { state, dispatch } = useProductContext();
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();
  const { auth, setAuth } = useAuth();
  const { toast } = useToast();

  function getSortedData(productsList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return [...productsList].sort(
        (a, b) => b["discountedPrice"] - a["discountedPrice"]
      );
    }
    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return [...productsList].sort(
        (a, b) => a["discountedPrice"] - b["discountedPrice"]
      );
    }
    return productsList;
  }

  function getPriceRangedData(productsList, price) {
    if (parseInt(price, 10) > 0) {
      return productsList.filter(
        (item) => parseInt(item.discountedPrice, 10) < parseInt(price, 10)
      );
    }
    return productsList;
  }

  let sortedData = getSortedData(state.products, state.sortBy);
  let priceRangedData = getPriceRangedData(sortedData, state.priceRange);

  return (
    <>
      <div className="productsParent">
        <aside>
          <Sidebar />
        </aside>

        <div className="cardParent">
          {priceRangedData.map((prd) => (
            <div key={prd._id}>
              <div className="card1">
                <Link to={`/product/${prd._id}`}>
                  <div className="imgDiv">
                    <img className="productImg" src={prd.image} />
                  </div>
                </Link>
                <div className="cardDetail">
                  <h3 className="productTitle">{prd.name}</h3>
                  <h4 className="productDescrip">{prd.description}</h4>
                  <div className="secondaryBtnDiv">
                    <button
                      className="secCardBtn"
                      onClick={() => {
                        cartClickHandler(
                          prd,
                          cartState,
                          cartDispatch,
                          auth,
                          toast
                        );
                      }}
                    >
                      Cart
                    </button>

                    <button
                      onClick={() => {
                        wishClickHandler(
                          prd,
                          wishlistItems,
                          setwishlistItems,
                          auth,
                          toast
                        );
                      }}
                      className="secCardBtn"
                    >
                      🤍 Wishlist
                    </button>
                  </div>
                  <div className="productPrice">
                    <b> ₹{prd.discountedPrice}</b>
                    <span className="strikeOut">₹{prd.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
