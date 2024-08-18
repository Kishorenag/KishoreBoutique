export function toTitleCase(str) {
  if (str === null || str === "" || str === undefined) return false;
  else str = str.toString();

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const initialCartData = [
  {
    id: 1,
    quantity: 10,
  },
  {
    id: 4,
    quantity: 10,
  },
  {
    id: 9,
    quantity: 5,
  },
  {
    id: 6,
    quantity: 6,
  },
  {
    id: 12,
    quantity: 15,
  },
  {
    id: 5,
    quantity: 9,
  },
  {
    id: 16,
    quantity: 8,
  },
  {
    id: 13,
    quantity: 6,
  },
  {
    id: 18,
    quantity: 2,
  },
  {
    id: 3,
    quantity: 8,
  },
  {
    id: 7,
    quantity: 12,
  },
];

export async function saveCartToLocal(cartData) {
  let getData = localStorage.getItem("myCartData");
  let passData = getData ? JSON.parse(getData) : [];

  passData = [...cartData];

  const tempCartData = await Promise.all(
    passData.map(async (cartItem) => {
      const productDetails = await getProductById(cartItem.id);
      if (productDetails) {
        return {
          id: productDetails.id,
          image: productDetails.image,
          productName: productDetails.title,
          price: productDetails.price,
          quantity: cartItem.quantity,
        };
      } else {
        return cartItem;
      }
    })
  );

  localStorage.setItem("myCartData", JSON.stringify(tempCartData));
  window.dispatchEvent(new Event("cartUpdated"));
  
  return tempCartData;
}

export function getCartFromLocal() {
  let getData = localStorage.getItem("myCartData");
  let passData = getData ? JSON.parse(getData) : [];
  return passData;
}

export function setTotalCartBadge() {
  const tempCartData = getCartFromLocal();
  const tempTotalQuantity = tempCartData.reduce((quantity, cartItem) => {
    return quantity + cartItem.quantity;
  }, 0);
  return tempTotalQuantity;
}

async function getProductById(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export function addCartItem(cartItemId) {
  const cartData = getCartFromLocal();
  const newCardData = cartData?.map(item =>
    item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
  );
  localStorage.setItem("myCartData", JSON.stringify(newCardData));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function removeCartItem(cartItemId) {
  const cartData = getCartFromLocal();
  const newCardData = cartData?.map(item =>
    item.id === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
  );
  localStorage.setItem("myCartData", JSON.stringify(newCardData));
  window.dispatchEvent(new Event("cartUpdated"));
}

export  function removeFromCart(cartItemId, quantity) {
  const cartData = getCartFromLocal();
  const newCartData = cartData.filter((item) => item.id !== cartItemId);
  saveCartToLocal(newCartData);

  console.table(cartData);
  console.table(newCartData);
  console.log(cartItemId, quantity);
}

