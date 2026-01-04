import React, { useRef, useEffect, useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { formatCurrency } from '../utils/helpers';
import styles from './Cart.module.css';

const Cart = () => {
    const {
        cartItems,
        totalPrice,
        isCartOpen,
        toggleCart,
        clearCart
    } = useCart();

    const cartRef = useRef();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isCartOpen && cartRef.current && !cartRef.current.contains(event.target)) {
                toggleCart();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCartOpen, toggleCart]);

    // Disable body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
        toggleCart(); // Close cart when opening checkout
    };

    return (
        <>
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
                aria-hidden="true"
            />

            <div
                className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}
                ref={cartRef}
            >
                <div className={styles.header}>
                    <h2>Your Cart</h2>
                    <button
                        onClick={toggleCart}
                        className={styles.closeBtn}
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    {cartItems.length === 0 ? (
                        <div className={styles.empty}>
                            <ShoppingBag size={48} className={styles.emptyIcon} />
                            <p>Your cart is empty.</p>
                            <button onClick={toggleCart} className={styles.shopBtn}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className={styles.itemsList}>
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Total:</span>
                            <span className={styles.totalAmount}>{formatCurrency(totalPrice)}</span>
                        </div>

                        <button onClick={handleCheckout} className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </button>

                        <button onClick={clearCart} className={styles.clearBtn}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>

            <Checkout
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </>
    );
};

export default Cart;
