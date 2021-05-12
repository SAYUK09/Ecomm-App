import React from "react";
import "./ProductDetail.css";
import { useProductContext } from "../../contexts/Products-Context";
import { CgShoppingCart, CgHeart, CgMediaPodcast } from "react-icons/cg";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";

export function ProductDetail() {
  const { id } = useParams();
  console.log(id, "paramId");
  console.log("lallala");
  const { state, dispatch } = useProductContext();

  const prdObj = state.products.filter((item) => item._id == id);

  console.log(prdObj, "trala");
  console.log(
    prdObj.map((item) => item.name),
    "llll"
  );

  console.log(state.products.filter((item) => item._id == id));

  // console.log(state.products.map((item)=> item._id==id ? {...item, name:"sk" }:null))

  return (
    <div className="ProductDetailParent">
      {state.products
        .filter((item) => {
          return item._id === id;
        })
        .map((prd) => {
          return (
            <div className="prodBody">
              <div className="prodImgDiv">
                <img className="prodImg" src={prd.image} />
              </div>
              <div className="prodDetail">
                <div className="prodDetailHead">
                  <p className="prodDetailTitle">{prd.name}</p>
                  <p className="prodDetailDesc">{prd.description}</p>
                  <p className="prodDetailRating">{prd.ratings}</p>
                </div>
                <div className="prodDetailBody">
                  <h3 className="prodDetaiBrand"> From {prd.brand}</h3>

                  <p className="prodDetaiPrice">
                    ₹{prd.discountedPrice}{" "}
                    <span className="cancelPrice">₹{prd.originalPrice}</span>{" "}
                  </p>

                  <small>Category : {prd.category}</small>
                </div>
                <div className="prodDetailFooter">
                  <button className="prodPrimaryBtn">
                    ADD TO CART <CgShoppingCart />
                  </button>

                  <button className="prodSecondaryBtn">
                    Move to Wishlist <CgShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
