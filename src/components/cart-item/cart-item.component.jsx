import React from 'react';

import { CartItemContainer, CartItemDetails, CartItemName, CartItemPrice } from "./cart-item.styles";

// import './cart-item.styles.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <img src={imageUrl} alt='item' />
    <CartItemDetails>
      <CartItemName>{name}</CartItemName>
      <CartItemPrice>
        {quantity} x ${price}
      </CartItemPrice>
    </CartItemDetails>
  </CartItemContainer>
);

export default CartItem;
