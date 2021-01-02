export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd);
  if (existingCartItem) {
    return cartItems.map(cartItem => (cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity++ } : cartItem));
  }
  return [{ ...cartItems, quantity: 1 }];
};
