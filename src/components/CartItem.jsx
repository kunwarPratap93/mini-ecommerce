import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className={styles.item}>
            <div className={styles.imageWrapper}>
                <img src={item.thumbnail} alt={item.title} className={styles.image} />
            </div>

            <div className={styles.details}>
                <h4 className={styles.title}>{item.title}</h4>
                <div className={styles.price}>{formatCurrency(item.price)}</div>

                <div className={styles.controls}>
                    <div className={styles.qtyGroup}>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}
                            className={styles.qtyBtn}
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>
                        <span className={styles.qty}>{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                            className={styles.qtyBtn}
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.removeBtn}
                        aria-label="Remove item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
