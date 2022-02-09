import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartAddItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartRemoveItemHandler = (id) => {
        cartCtx.removeItem(id);
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

    const formOrderHandler = () => {
        setIsCheckout(true);
    };

    return (
        <Modal onClose={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout />}
            <div className={classes.actions}>
                <button
                    className={classes["button-alt"]}
                    onClick={props.onCloseCart}
                >
                    Close
                </button>
                {hasItems && (
                    <button
                        className={classes.button}
                        onClick={formOrderHandler}
                    >
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default Cart;
