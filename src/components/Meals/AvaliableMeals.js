import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvaliableMeals.module.css";

const AvaliableMeals = () => {
    const [meals, setMeals] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "https://react-meals-ea297-default-rtdb.firebaseio.com/meals.json"
            );

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
        };

        fetchMeals();
    }, []);

    const mealsList = meals.map((dummyMeal) => {
        return (
            <MealItem
                key={dummyMeal.id}
                id={dummyMeal.id}
                name={dummyMeal.name}
                description={dummyMeal.description}
                price={dummyMeal.price}
            />
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvaliableMeals;
