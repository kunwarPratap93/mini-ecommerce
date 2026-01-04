import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart, cartItems } = useCart();
    const [imgError, setImgError] = useState(false);

    const cartItem = cartItems.find((item) => item.id === product.id);
    const currentQty = cartItem ? cartItem.quantity : 0;
    const isOutOfStock = product.stock === 0;
    const isLimitReached = currentQty >= product.stock;

    // Derived stock status for badge
    const stockStatus = isOutOfStock ? 'Out of Stock' : (product.stock < 10 ? 'Low Stock' : 'In Stock');
    const stockColor = isOutOfStock ? '#ef4444' : (product.stock < 10 ? '#f59e0b' : '#10b981');

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={imgError ? 'https://via.placeholder.com/300?text=No+Image' : product.thumbnail}
                    alt={product.title}
                    className={styles.image}
                    loading="lazy"
                    onError={() => setImgError(true)}
                />
                <span className={styles.categoryBadge}>{product.category}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title} title={product.title}>
                    {product.title}
                </h3>

                <div className={styles.metaRow}>
                    <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                    <div className={styles.stockInfo}>
                        <span
                            className={styles.stockDot}
                            style={{ backgroundColor: stockColor }}
                        />
                        <span className={styles.stockText}>
                            {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
                        </span>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={isOutOfStock || isLimitReached}
                        className={styles.addBtn}
                    >
                        {isOutOfStock
                            ? 'Out of Stock'
                            : (isLimitReached
                                ? 'Limit Reached'
                                : (currentQty > 0 ? `Add More (${currentQty})` : 'Add to Cart'))}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
