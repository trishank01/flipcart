export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParam) {
    searchParams.delete(key);
  }

  return searchParams;
};

export const calclulateOrderCost = (cartItems) => {
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
