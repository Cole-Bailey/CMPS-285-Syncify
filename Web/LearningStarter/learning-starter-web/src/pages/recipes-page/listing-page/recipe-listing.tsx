import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, RecipeGetDto } from "../../../constants/types";

export const RecipeListingPage = () => {
    const [recipes, setRecipes] = useState<RecipeGetDto[]>();
    const fetchRecipes = async() => {
        const response = await axios.get<ApiResponse<RecipeGetDto[]>>(
            `${BaseUrl}/api/recipes`
            );
        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        } else {
            setRecipes(response.data.data);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            <div>
                {recipes ? ( 
                recipes.map(recipes => {
                    return (
                        <Segment>
                            <div>Id: {recipes.id}</div>
                            <div>Name: {recipes.name}</div>
                            <div>Image: {recipes.image}</div>
                            <div>Servings: {recipes.servings}</div>
                            <div>Directions: {recipes.directions}</div>
                            <div>Meal Type: {recipes.mealTypeId}</div>
                            <div>Calendar: {recipes.calendarId}</div>
                        </Segment>
                    );
                }) 
            ) : (
                <div>Loading</div>
            )}
        </div>
        </>
    );
};