# Mini E-Commerce Product & Cart

A modern e-commerce application built using **React** to demonstrate component design, state management, filtering logic, and performance optimization with a polished, Amazon-inspired UI.

This project focuses on **clarity, correctness, and clean React fundamentals**, delivering a production-ready shopping experience.

---

## 🚀 Live Demo
👉 https://kunwarpratap93.github.io/mini-ecommerce/


## 📦 GitHub Repository
👉 https://github.com/kunwarPratap93/mini-ecommerce

---

## ✨ Features

### Product Listing
- Displays 24+ products in a responsive grid
- Each product shows:
  - Product name
  - Price (in Indian Rupees ₹)
  - Category badge
  - Stock status with color-coded indicator (Green dot for in stock, Red for out of stock)
  - Explicit stock count (e.g., "15 in stock")
  - Compact, Amazon-style "Add to Cart" button
- High-quality product images with fallback handling
- Smooth hover effects and animations

### Search, Filter & Sort
- **Header Search Bar**: Centrally positioned search with icon
- **Filter by Category**: Vertical sidebar with clickable category filters
- **Sort by Price**:
  - Low → High
  - High → Low
- **Clear All Filters** button
- All filters work together seamlessly (search + category + sort)
- Debounced search for optimal performance

### Cart Functionality
- **Add items to cart** with smart button states
- **Remove items** from cart
- **Update item quantity** with +/- controls
- Quantity validation (cannot exceed available stock)
- Real-time updates for:
  - Total items (displayed in header badge)
  - Total price
- Cart drawer slides in from the right
- Empty cart state with call-to-action
- **Cart persisted** using `localStorage`

### Checkout & Payment System
- **Multi-step checkout process**:
  1. **Delivery Details**: Form with name, email, phone, address, city, pincode
  2. **Payment Method Selection**: 
     - Credit/Debit Card
     - UPI
     - Cash on Delivery (COD)
  3. **Order Confirmation**: Success message with order details
- **Order Receipt**:
  - Unique Order ID generation
  - Complete order summary
  - Customer details
  - Downloadable receipt (.txt file)
- **Payment status**: Visual confirmation with checkmark icon

### UI/UX Enhancements
- **Modern Design**: Clean, Amazon-inspired interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Glassmorphism Effects**: Subtle backdrop blur on header
- **Smooth Animations**: Fade-ins, hover effects, drawer transitions
- **Color-Coded Stock Status**: Visual indicators for stock availability
- **Capsule Buttons**: Modern pill-shaped buttons with gradients
- **Light Blue Theme**: Soft, accessible color palette

---

## 🧠 State Management & Design Decisions

### Global State (Context API)
- **CartContext** manages:
  - Cart items array
  - Cart drawer open/close state
  - Add, remove, update, and clear cart functions
  - Memoized total price and total items calculations
  - Automatic localStorage persistence

### Local State
- **Product filters** (search query, category, sort) in `App.jsx`
- **Checkout form data** and **payment method** in `Checkout.jsx`
- **Image error handling** in `ProductCard.jsx`

### Derived State
- Total price and total items are **calculated, not stored**
- Filtered products use `useMemo` for performance
- Search input is debounced (300ms delay)

### Performance Optimizations
- `React.memo` on `ProductList` and `ProductCard` prevents unnecessary re-renders
- `useMemo` for filtered products and cart totals
- `useCallback` for filter reset function
- Debounced search reduces render frequency
- Stable keys (`product.id`) for list rendering

---

## ⚡ Performance Optimizations

✅ Product list does **not** re-render when cart state updates  
✅ Filtering and sorting logic is **memoized**  
✅ Search input is **debounced** (300ms)  
✅ Cart totals are **memoized**  
✅ Components use `React.memo` to prevent unnecessary renders  
✅ Stable keys used for all lists  
✅ No derived data stored in state  

---

## 🧩 Project Structure

```
mini-ecommerce/
├── public/
├── src/
│   ├── components/
│   │   ├── Cart.jsx                 # Cart drawer component
│   │   ├── Cart.module.css
│   │   ├── CartItem.jsx             # Individual cart item
│   │   ├── CartItem.module.css
│   │   ├── Checkout.jsx             # Multi-step checkout modal
│   │   ├── Checkout.module.css
│   │   ├── Filters.jsx              # Sidebar filters
│   │   ├── Filters.module.css
│   │   ├── Header.jsx               # Header with search & cart
│   │   ├── Header.module.css
│   │   ├── ProductCard.jsx          # Product card component
│   │   ├── ProductCard.module.css
│   │   ├── ProductList.jsx          # Product grid
│   │   └── ProductList.module.css
│   ├── context/
│   │   └── CartContext.jsx          # Global cart state
│   ├── hooks/
│   │   ├── useDebounce.js           # Debounce hook
│   │   └── useProducts.js           # Product data hook
│   ├── utils/
│   │   └── helpers.js               # Currency formatter (INR)
│   ├── App.jsx                      # Main app component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # App entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## �️ Tech Stack

- **React** (Functional Components & Hooks)
- **Vite** (Build tool)
- **CSS Modules** (Scoped styling)
- **Lucide React** (Icons)
- **Context API** (State management)
- No UI libraries (custom components)
- No backend (static product data)

---

## 📋 Key Features Implementation

### 1. Product Data
- 24+ products across 6 categories (Health, Electronics, Clothing, Footwear, Home, Accessories)
- Each product includes: id, title, price, mrp, category, stock, thumbnail, description
- Discount percentage calculated dynamically
- High-quality Unsplash images with fallback handling

### 2. Filtering Logic
```javascript
// Combined filters work together
const filteredProducts = useMemo(() => {
  let result = [...products];
  
  // Search filter
  if (debouncedQuery) {
    result = result.filter(p => 
      p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }
  
  // Category filter
  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }
  
  // Sort by price
  if (filters.sortBy === 'low-high') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'high-low') {
    result.sort((a, b) => b.price - a.price);
  }
  
  return result;
}, [products, debouncedQuery, filters.category, filters.sortBy]);
```

### 3. Cart Management
```javascript
// Add to cart with stock validation
const addToCart = (product) => {
  const existingItem = cartItems.find(item => item.id === product.id);
  const currentQty = existingItem ? existingItem.quantity : 0;
  
  if (currentQty >= product.stock) {
    return; // Prevent exceeding stock
  }
  
  // Add or increment quantity
  // ...
};
```

### 4. Checkout Flow
1. User fills delivery details
2. Selects payment method (Card/UPI/COD)
3. Confirms order
4. Receives order ID and receipt
5. Can download receipt as .txt file

---

## ▶️ Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Design Philosophy

- **User-First**: Intuitive navigation and clear visual hierarchy
- **Performance**: Optimized rendering and memoization
- **Accessibility**: Semantic HTML and ARIA labels
- **Responsiveness**: Mobile-first design approach
- **Modern Aesthetics**: Clean, professional, Amazon-inspired UI

---

## 📱 Responsive Design

- **Desktop**: Full sidebar + grid layout
- **Tablet**: Adjusted grid columns
- **Mobile**: Stacked layout (sidebar can be toggled)

---

## 🔄 State Flow

```
User Action → Component → Context/Hook → State Update → Re-render (optimized)
```

Example:
```
Click "Add to Cart" → ProductCard → CartContext.addToCart() → 
Update cartItems → Cart badge updates (memoized)
```

---

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Backend integration
- [ ] Order history
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Real payment gateway integration
- [ ] Email notifications

---

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

---

## 👨‍💻 Author

Built with ❤️ using React and modern web development practices.

---

## � Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Inspired by Amazon's UI/UX design

---

**Happy Shopping! 🛒**
