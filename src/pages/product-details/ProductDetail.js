import React from "react";
import "./ProductDetail.css";
import { useProductContext } from "../../contexts/Products-Context";
import { CgShoppingCart, CgHeart, CgMediaPodcast } from "react-icons/cg";
import { ProductDetailCard } from "../../components/product-detail-card/Product-Detail-Card";

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

  // console.log(state.products.filter((item) => item._id == id));

  // console.log(state.products.map((item)=> item._id==id ? {...item, name:"sk" }:null))

  return (
    <div className="ProductDetailParent">
      {state.products
        .filter((item) => {
          return item._id === id;
        })
        .map((prd) => {
          return (
            <ProductDetailCard
              img={prd.image}
              name={prd.name}
              description={prd.description}
              rating={prd.ratings}
              brand={prd.brand}
              discountedPrice={prd.discountedPrice}
              originalPrice={prd.originalPrice}
              category={prd.category}
            />
          );
        })}
    </div>
  );
}
