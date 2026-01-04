import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';

function AppContent() {
  const { products, loading, error, categories } = useProducts();
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    sortBy: ''
  });

  // Debounce search query to optimize performance
  const debouncedQuery = useDebounce(filters.query, 300);

  // Clear all filters
  const resetFilters = useCallback(() => {
    setFilters({ query: '', category: '', sortBy: '' });
  }, []);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search (Debounced)
    if (debouncedQuery) {
      const lowerQuery = debouncedQuery.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // 3. Sort
    if (filters.sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, debouncedQuery, filters.category, filters.sortBy]);

  return (
    <>
      <Header
        searchQuery={filters.query}
        onSearch={(q) => setFilters(prev => ({ ...prev, query: q }))}
      />
      <div className="main-layout container">
        <Filters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          resetFilters={resetFilters}
        />
        <main className="product-grid-area">
          {/* Mobile Filter Toggle could go here */}
          {filters.query && <p style={{ marginBottom: '1rem' }}>Results for "{filters.query}"</p>}

          <ProductList
            products={filteredProducts}
            loading={loading}
            error={error}
          />
        </main>
      </div>
      <Cart />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
