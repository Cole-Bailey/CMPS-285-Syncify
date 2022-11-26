import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/env-cars";
import {
  ApiResponse,
  RecipeIngredientCreateDto,
} from "../../../constants/types";

const initialValues: RecipeIngredientCreateDto = {
  recipeId: 0,
  ingredientId: 0,
  quantity: 0,
  unitId: 0,
};

export const RecipeIngredientCreatePage = () => {
  const history = useHistory();

  const onSubmit = async (values: RecipeIngredientCreateDto) => {
    const response = await axios.post<ApiResponse<RecipeIngredientCreateDto>>(
      `${BaseUrl}/api/recipe-ingredients`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.recipeIngredients.listing);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="recipe">Recipe</label>
          </div>
          <Field id="recipe" name="recipe.name">
            {({ field }) => <Input {...field} />}
          </Field>{" "}
          <div>
            <label htmlFor="ingredient">Ingredient</label>
          </div>
          <Field id="ingredient" name="ingredient.name">
            {({ field }) => <Input {...field} />}
          </Field>{" "}
          <div>
            <label htmlFor="quantity">Quantity</label>
          </div>
          <Field id="quantity" name="quantity">
            {({ field }) => <Input type="number" {...field} />}
          </Field>{" "}
          <div>
            <label htmlFor="unit">Unit</label>
          </div>
          <Field id="unit" name="unit.abbreviation">
            {({ field }) => <Input {...field} />}
          </Field>{" "}
          <div>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
