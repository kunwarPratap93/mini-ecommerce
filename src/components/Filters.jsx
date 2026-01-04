import React from 'react';
import styles from './Filters.module.css';

const Filters = ({ filters, setFilters, categories, resetFilters }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <h3>Filters</h3>
                <button onClick={resetFilters} className={styles.clearBtn} type="button">Clear All</button>
            </div>


            {/* Category Filter */}
            <div className={styles.section}>
                <h4>Category</h4>
                <div className={styles.list}>
                    <button
                        className={`${styles.categoryItem} ${filters.category === '' ? styles.active : ''}`}
                        onClick={() => handleChange('category', '')}
                        type="button"
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.categoryItem} ${filters.category === cat ? styles.active : ''}`}
                            onClick={() => handleChange('category', cat)}
                            type="button"
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Sorting */}
            <div className={styles.section}>
                <h4>Sort by Price</h4>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="sort"
                            checked={filters.sortBy === 'low-high'}
                            onChange={() => handleChange('sortBy', 'low-high')}
                        />
                        <span>Low to High</span>
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="sort"
                            checked={filters.sortBy === 'high-low'}
                            onChange={() => handleChange('sortBy', 'high-low')}
                        />
                        <span>High to Low</span>
                    </label>
                </div>
            </div>
        </aside>
    );
};

export default Filters;
