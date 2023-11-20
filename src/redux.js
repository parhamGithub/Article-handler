import { configureStore } from "@reduxjs/toolkit";

// Action
// const action01 = { type: "counter/increment", payload: 1 };

// Action Creators
export const increment = number => {
    return {
        type: "counter/increment",
        payload: number
    }
};

// Reducer
// (state, action) => newState;     --> copy

const initialState = { value: 0 };
const counterReducer = (state = initialState, action) => {
    if (action.type === "counter/increment") {
        const copyState = { ...state };
        return {
            value: copyState.value += 1
        }
    }

    return state;
};


// Store
export const store = configureStore({ reducer: counterReducer });

// store.getState();    --> returns the current state

// Dispatch
// store.dispatch(type: "counter/increment")    --> changing the current state by giving it an Action
// store.dispatch(increment());

// Selectors
const selectCounterValue = state => state.value;

export const currentValue = selectCounterValue(store.getState());

console.log(currentValue);

// currentValue     -->     selectCurrentValue      -->     store.getState      -->     state.value