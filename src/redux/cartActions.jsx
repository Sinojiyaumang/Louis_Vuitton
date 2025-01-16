export const addToCart = (product) => ({
    type: "ADD_TO_CART",
    payload: product,
});

export const incrementQuantity = (productId) => ({
    type: "INCREMENT_QUANTITY",
    payload: productId,
});

export const decrementQuantity = (productId) => ({
    type: "DECREMENT_QUANTITY",
    payload: productId,
});

export const removeItemFromCart = (id) => ({
    type: "REMOVE_ITEM_FROM_CART",
    payload: id,
})

export const clearCart = () => {
    return {
        type: "CLEAR_CART",
    };
};

