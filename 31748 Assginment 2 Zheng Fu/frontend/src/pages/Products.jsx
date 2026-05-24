import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts, addToCart } from "../api";

import laptop1 from "../images/laptop_1.jpg";
import laptop2 from "../images/laptop_2.jpg";
import mouse1 from "../images/mouse_1.jpg";
import mouse2 from "../images/mouse_2.jpg";
import keyboard1 from "../images/keyboard_1.jpg";
import keyboard2 from "../images/keyboard_2.jpg";
import headphones1 from "../images/headphones_1.jpg";
import headphones2 from "../images/headphones_2.jpg";
import monitor1 from "../images/monitor_1.jpg";
import monitor2 from "../images/monitor_2.jpg";

const productImages = {
  Laptop: [laptop1, laptop2],
  Mouse: [mouse1, mouse2],
  Keyboard: [keyboard1, keyboard2],
  Headphones: [headphones1, headphones2],
  Monitor: [monitor1, monitor2],
};

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(Array.isArray(data) ? data : []);
  };

  const getProductImages = (productName) => {
    return productImages[productName] || [laptop1, laptop2];
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    const data = await addToCart(productId, quantity);

    if (data.detail) {
      alert(data.detail);
    } else {
      alert("Product has been added to cart.");
      await loadProducts();
      closeProductModal();
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalQuantity(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Navbar />

      <main className="products-section">
        <div className="section-title-row">
          <h2>Products</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="product-list">
          {filteredProducts.map((product) => {
            const images = getProductImages(product.name);

            return (
              <ProductCard
                key={product.id}
                product={product}
                image={images[0]}
                onViewDetails={openProductModal}
                onAddToCart={() => handleAddToCart(product.id, 1)}
              />
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">No products found.</p>
        )}
      </main>

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal product-modal">
            <button className="close-btn" onClick={closeProductModal}>
              &times;
            </button>

            <div className="product-modal-content">
              <div className="product-modal-top">
                <div className="product-modal-image-wrap">
                  <img
                    src={getProductImages(selectedProduct.name)[0]}
                    alt={`${selectedProduct.name} 1`}
                    className="product-modal-image"
                  />

                  <img
                    src={getProductImages(selectedProduct.name)[1]}
                    alt={`${selectedProduct.name} 2`}
                    className="product-modal-image"
                  />
                </div>

                <div className="product-modal-info">
                  <h3>{selectedProduct.name}</h3>
                  <p className="modal-description">
                    {selectedProduct.description}
                  </p>

                  <p className="modal-price">
                    ${Number(selectedProduct.price).toFixed(2)}
                  </p>

                  <p className="modal-stock">
                    Stock: {selectedProduct.stock}
                  </p>

                  <div className="quantity-row">
                    <span className="quantity-label">Quantity</span>

                    <div className="quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          setModalQuantity((q) => Math.max(1, q - 1))
                        }
                      >
                        -
                      </button>

                      <span className="qty-value">{modalQuantity}</span>

                      <button
                        className="qty-btn"
                        onClick={() =>
                          setModalQuantity((q) =>
                            Math.min(selectedProduct.stock, q + 1)
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="primary-btn"
                    style={{ marginTop: "18px" }}
                    onClick={() =>
                      handleAddToCart(selectedProduct.id, modalQuantity)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="modal-spec-section">
                <h4 className="modal-spec-title">Specification</h4>
                <div className="modal-spec-text">
                  <p>{selectedProduct.specifications}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;