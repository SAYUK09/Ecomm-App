import "./Nav.css";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";
import { CgShoppingCart, CgHeart, CgMediaPodcast } from "react-icons/cg";
import { FcShop } from "react-icons/fc";

export function Nav() {
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();

  return (
    <div>
      <nav className="nav1">
        <div className="logo">
          <img className="navLogo" src="/ecom-nav-favicon.png" />
        </div>
        <input className="navSearchBar" placeholder="🔎Search something" />
        <div className="navIcons">
          <Link className="routeLink" to="/">
            <CgMediaPodcast />
          </Link>
          &nbsp;
          <Link className="routeLink" to="/cart">
            <span className="iconBadge">{cartState.cart.length}</span>
            <CgShoppingCart />
          </Link>
          &nbsp;
          <Link className="routeLink" to="/wishlist">
            <span className="iconBadge">{wishlistItems.length}</span>
            <CgHeart />
          </Link>
          &nbsp;
        </div>
      </nav>
    </div>
  );
}
