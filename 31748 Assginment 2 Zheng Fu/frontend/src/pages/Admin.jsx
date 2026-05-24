import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCarts } from "../api";

function Admin() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadAllCarts();
  }, []);

  const loadAllCarts = async () => {
    const data = await getAllCarts();
    setCartItems(Array.isArray(data) ? data : []);
  };

  const users = [...new Set(cartItems.map((item) => item.username))];

  const selectedUserCart = selectedUser
    ? cartItems.filter((item) => item.username === selectedUser)
    : [];

  const selectedUserTotal = selectedUserCart.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0
  );

  return (
    <div className="container">
      <Navbar />

      <main className="admin-section">
        <h2>Admin Panel - Users</h2>

        {users.length === 0 ? (
          <p className="empty-message">No user cart data found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((username) => (
                <tr key={username}>
                  <td>{username}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setSelectedUser(username)}
                    >
                      View Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setSelectedUser(null)}
            >
              &times;
            </button>

            <h2>{selectedUser}'s Shopping Cart</h2>

            {selectedUserCart.length === 0 ? (
              <p className="empty-message">This user's cart is empty.</p>
            ) : (
              <>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cart Item ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedUserCart.map((item) => (
                      <tr key={item.cart_item_id}>
                        <td>{item.cart_item_id}</td>
                        <td>{item.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>${Number(item.subtotal).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="cart-footer">
                  <p className="cart-total">
                    Total: ${selectedUserTotal.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;