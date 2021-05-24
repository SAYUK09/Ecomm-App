import "./Products.css";
import { Link } from "react-router-dom";
import { useProductContext } from "../../contexts/Products-Context";
import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";
import { addToCart } from "../../pages/cart/Cart";
import { axiosAddToCart, axiosAddQty } from "../../utilty/cart-utility";
import { axiosAddToWishlist } from "../../utilty/wishlist-utility";

export function Products() {
  const { state, dispatch } = useProductContext();
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();

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
          <div
            className="btnPrimary"
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
          >
            RESET
          </div>
          <div className="asideTitle">SORT BY</div>
          <div className="radioBtnDiv">
            <label>
              <input
                type="radio"
                name="sort"
                value={state.sortBy}
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
                checked={state.sortBy && state.sortBy === "PRICE_HIGH_TO_LOW"}
              />{" "}
              High To Low
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value={state.sortBy}
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
                checked={state.sortBy && state.sortBy === "PRICE_LOW_TO_HIGH"}
              />{" "}
              Low To High
            </label>
          </div>

          <div className="asideTitle">PRICE RANGE</div>
          <label>
            <input
              className="slider"
              type="range"
              min="1200"
              max="100000"
              value={state.priceRange}
              onChange={(e) =>
                dispatch({ type: "PRICE_RANGE", payload: e.target.value })
              }
            />
            Value : ₹{state.priceRange}
          </label>
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
                      onClick={() => {
                        axiosAddToCart(prd, cartDispatch);
                        // cartDispatch({ type: "ADD_TO_CART", payload: prd });
                      }}
                      className="secCardBtn"
                    >
                      Cart
                    </button>

                    <button
                      onClick={() => {
                        axiosAddToWishlist(
                          prd,
                          wishlistItems,
                          setwishlistItems
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
