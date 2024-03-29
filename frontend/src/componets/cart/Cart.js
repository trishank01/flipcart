import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { removeCartItem, setCartItem } from "../../redux/features/cartSlice";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  console.log(cartItems);

  useEffect(() => {
    const SingleProductTotal = cartItems.map(
      (item) => item.price * item.quantity
    );
    const total = SingleProductTotal.reduce((acc, item) => acc + item, 0);
    setCartTotal(Number(total).toFixed(2));
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <h2>No Cart Item Found</h2>;
  }

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;
    if (newQty >= item?.stock) return;
    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    setItemToCart(item, newQty);
  };

  //
  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };
    dispatch(setCartItem(cartItem));
  };

  const RemoveHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping")
  }

  return (
    <>
      <MetaData title={"Your Cart"} />
      <h2 className="mt-5">
        Your Cart: <b>{cartItems?.length} Items</b>
      </h2>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {cartItems.map((item) => {
            return (
              <>
                <hr />
                <div className="cart-item" data-key="product1">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        height="90"
                        width="115"
                      />
                    </div>
                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${item?.product}`}>
                        {" "}
                        {item?.name}{" "}
                      </Link>
                    </div>
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">{item?.price}</p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreseQty(item, item.quantity)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item?.quantity}
                          readonly
                        />
                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(item, item.quantity)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                    </div>
                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="btn btn-danger"
                        onClick={() => RemoveHandler(item.product)}
                      >
                        <FaTrash />
                      </i>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Units:{" "}
              <span className="order-summary-values">
                {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
                (Units)
              </span>
            </p>
            <p>
              Est. total:{" "}
              <span className="order-summary-values">${cartTotal} </span>
            </p>
            <hr />
            <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary w-100">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
