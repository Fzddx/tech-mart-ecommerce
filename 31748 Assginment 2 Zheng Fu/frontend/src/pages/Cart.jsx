import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCart, updateCartItem, deleteCartItem } from "../api";

import laptop1 from "../images/laptop_1.jpg";
import mouse1 from "../images/mouse_1.jpg";
import keyboard1 from "../images/keyboard_1.jpg";
import headphones1 from "../images/headphones_1.jpg";
import monitor1 from "../images/monitor_1.jpg";

const cartImages = {
  Laptop: laptop1,
  Mouse: mouse1,
  Keyboard: keyboard1,
  Headphones: headphones1,
  Monitor: monitor1,
};

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await getCart();
    setCartItems(Array.isArray(data) ? data : []);
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) {
      await deleteCartItem(item.cart_item_id);
    } else {
      await updateCartItem(item.cart_item_id, item.quantity - 1);
    }

    loadCart();
  };

  const handleIncrease = async (item) => {
    await updateCartItem(item.cart_item_id, item.quantity + 1);
    loadCart();
  };

  const handleRemove = async (cartItemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );

    if (!confirmed) {
      return;
    }

    await deleteCartItem(cartItemId);
    loadCart();
  };
  
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0
  );

  return (
    <div className="container">
      <Navbar />

      <main className="cart-section">
        <h2>Shopping Cart</h2>

        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.cart_item_id}>
              <div className="cart-item-row">
                <div className="cart-left">
                  <img
                    src={cartImages[item.name] || laptop1}
                    alt={item.name}
                    className="cart-product-image"
                  />

                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: ${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>

                <div className="cart-right">
                  <p className="cart-subtotal">
                    Subtotal: ${Number(item.subtotal).toFixed(2)}
                  </p>

                  <div className="cart-actions">
                    <div className="quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>

                      <span className="qty-value">{item.quantity}</span>

                      <button
                        className="qty-btn"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.cart_item_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <p className="empty-message">Your cart is empty.</p>
          )}
        </div>

        <div className="cart-footer">
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
        </div>
      </main>
    </div>
  );
}

export default Cart;