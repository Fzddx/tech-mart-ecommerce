function ProductCard({ product, image, onViewDetails, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-clickable" onClick={() => onViewDetails(product)}>
        <div className="product-image-wrap">
          <img
            src={image}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${Number(product.price).toFixed(2)}</p>
          <p className="product-stock">Stock: {product.stock}</p>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;