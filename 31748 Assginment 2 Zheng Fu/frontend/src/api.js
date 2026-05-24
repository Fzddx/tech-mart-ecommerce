const BASE_URL = "http://127.0.0.1:8000";

// Helper function to get the token from localStorage 
export const getToken = () => {
  return localStorage.getItem("token");
};

// Register
export const register = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return res.json();
};

// Login
export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return res.json();
};

// Get all products
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

// Get the current user's cart
export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  return res.json();
};

// Add the product to the cart
export const addToCart = async (product_id, quantity = 1) => {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      product_id,
      quantity,
    }),
  });

  return res.json();
};

// Update the quantity of a cart item
export const updateCartItem = async (cartItemId, quantity) => {
  const res = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ quantity })
  });

  return res.json();
};

// Remove a cart item
export const deleteCartItem = async (cartItemId) => {
  const res = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  return res.json();
};

// Get all carts (admin)
export const getAllCarts = async () => {
  const res = await fetch(`${BASE_URL}/admin/carts`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  return res.json();
};