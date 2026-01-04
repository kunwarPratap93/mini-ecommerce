import React from 'react';
import { ShoppingCart, Store, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const Header = ({ searchQuery, onSearch }) => {
    const { totalItems, toggleCart } = useCart();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Store className={styles.icon} />
                    <h1>MiniMarket</h1>
                </div>

                <div className={styles.searchBar}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <button
                    className={styles.cartBtn}
                    onClick={toggleCart}
                    aria-label="Open cart"
                >
                    <ShoppingCart size={24} />
                    {totalItems > 0 && (
                        <span className={styles.badge}>{totalItems}</span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
