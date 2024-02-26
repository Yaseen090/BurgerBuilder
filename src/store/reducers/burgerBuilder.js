import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    price: 0.0,
    error: false,
    building: false

};

const INGREDIENT_PRICES = {
    Salad: 0.5,
    Cheese: 0.4,
    Meat: 1.3,
    Bacon: 0.7
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true

    }
    return updateObject( state, updatedState );
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
        building: true

    }
    return updateObject( state, updatedSt );
};

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            Salad: action.ingredients.Salad,
            Bacon: action.ingredients.Bacon,
            Cheese: action.ingredients.Cheese,
            Meat: action.ingredients.Meat
        },
        price: 4,
        error: false,
        building: false

    } );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;