export const initialState = {
    basket: [],
    user: null
};

//Selector
//this function takes basket as an argument 
//reduce function declares one initial variable amount and iterates over each item of basket and add the price of each item to the amount variable.
//amount is returned to the getBasketTotal function
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }

        
        // This will remove all the instances of that item because all the instances of that item will have same id
        // case "REMOVE_FROM_BASKET":
        //     return {
        //         ...state,
        //         basket: state.basket.filter(item => item.id !== action.id)
        //     }

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as it's not in the basket!`)
            }

            return {
                ...state,
                basket: newBasket
            }

            case "SET_USER":
                return{
                    ...state,
                    user: action.user
                }

        default:
            return state;
    }
};

export default reducer;