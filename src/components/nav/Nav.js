import "./Nav.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";
import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";
import { CgShoppingCart, CgHeart, CgMediaPodcast } from "react-icons/cg";
import { FcShop } from "react-icons/fc";
import { useAuth } from "../../contexts/Auth-Context";
import { Cart } from "../../pages/cart/Cart";
import logo from "../../assets/ecom-nav-favicon.png";

export function Nav() {
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();
  const [cartBadgeDisplay, setCartBadgeDisplay] = useState("none");
  const [wishlistBadgeDisplay, setwishlistBadgeDisplay] = useState("none");
  const { auth } = useAuth();

  useEffect(() => {
    if (wishlistItems.length > 0) {
      setwishlistBadgeDisplay("block");
    } else {
      setwishlistBadgeDisplay("none");
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (cartState.cart.length > 0) {
      setCartBadgeDisplay("block");
    } else {
      setCartBadgeDisplay("none");
    }
  }, [cartState.cart]);

  return (
    <div>
      <nav className="nav1">
        <div className="logo">
          <img className="navLogo" src={logo} />
        </div>
        <input className="navSearchBar" placeholder="🔎Search something" />
        <div className="navIcons">
          <div className="userName">
            {auth ? (
              `welcome ${auth.user.name}`
            ) : (
              <Link className="routerLink" to="/login">
                Login
              </Link>
            )}
          </div>
          <Link className="routeLink" to="/">
            <CgMediaPodcast />
          </Link>
          &nbsp;
          <Link className="routeLink" to="/cart">
            <span style={{ display: cartBadgeDisplay }} className="iconBadge">
              {cartState.cart.length}
            </span>
            <CgShoppingCart />
          </Link>
          &nbsp;
          <Link className="routeLink" to="/wishlist">
            <span
              style={{ display: wishlistBadgeDisplay }}
              className="iconBadge"
            >
              {wishlistItems.length}
            </span>
            <CgHeart />
          </Link>
          &nbsp;
        </div>
      </nav>
    </div>
  );
}
