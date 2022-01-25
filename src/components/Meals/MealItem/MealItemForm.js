import React, { useRef } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const formInputRef = useRef();

    const submitFormHandler = (event) => {
        event.preventDefault();

        const enteredAmount = formInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            return;
        }
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <Input
                ref={formInputRef}
                label="Amount"
                input={{
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+Add</button>
        </form>
    );
};

export default MealItemForm;
