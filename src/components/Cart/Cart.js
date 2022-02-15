import React, { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartAddItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartRemoveItemHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const formOrderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(
            "https://react-meals-ea297-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={cartAddItemHandler.bind(null, item)}
                    onRemove={cartRemoveItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const modalAction = (
        <div className={classes.actions}>
            <button
                className={classes["button-alt"]}
                onClick={props.onCloseCart}
            >
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={formOrderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onCloseCart}
                />
            )}
            {!isCheckout && modalAction}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending over data...</p>;

    const didSubmittingModalContent = (
        <Fragment>
            <p>Sucessfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onCloseCart}>
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmittingModalContent}
        </Modal>
    );
};

export default Cart;
