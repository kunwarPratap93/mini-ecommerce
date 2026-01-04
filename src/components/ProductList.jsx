import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products, loading, error }) => {
    if (loading) {
        return (
            <div className={styles.center}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.center}>
                <div className={styles.error}>Error: {error}</div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className={styles.center}>
                <div className={styles.empty}>No products found.</div>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default React.memo(ProductList);
