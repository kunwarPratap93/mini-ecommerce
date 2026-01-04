import { useState, useEffect } from 'react';

const STATIC_PRODUCTS = [
    // Health & Personal Care
    { id: 601, title: 'Supredyn Daily Multivitamin Tablets - 15 Tablets', price: 349, mrp: 450, category: 'health', stock: 120, thumbnail: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop', description: 'Daily multivitamin for men and women. Boosts immunity and energy.' },
    { id: 602, title: 'TrueBasics Multivit Men, 30 Tablets', price: 1199, mrp: 1499, category: 'health', stock: 45, thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', description: 'Scientifically formulated multivitamin for men.' },
    { id: 603, title: 'Boldfit Vitamin C Complex', price: 399, mrp: 799, category: 'health', stock: 200, thumbnail: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop', description: 'Immunity booster with Amla and Zinc.' },

    // Electronics
    { id: 101, title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 24999, mrp: 29990, category: 'electronics', stock: 15, thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', description: 'Industry leading noise cancellation.' },
    { id: 102, title: 'Mi Power Bank 3i 20000mAh', price: 2149, mrp: 3999, category: 'electronics', stock: 80, thumbnail: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop', description: 'High capacity power bank for all your devices.' },
    { id: 103, title: 'Logitech MX Master 3S Wireless Mouse', price: 9495, mrp: 10995, category: 'electronics', stock: 25, thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', description: 'Performance wireless mouse with ultrafast scrolling.' },
    { id: 104, title: 'Keychron K2 Mechanical Keyboard', price: 8999, mrp: 9999, category: 'electronics', stock: 5, thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', description: 'Compact wireless mechanical keyboard for Mac and Windows.' },
    { id: 105, title: 'Samsung T7 Shield 1TB SSD', price: 8499, mrp: 12999, category: 'electronics', stock: 40, thumbnail: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop', description: 'Rugged portable SSD with fast transfer speeds.' },

    // Fashion
    { id: 201, title: 'Allen Solly Men\'s Polo T-Shirt', price: 699, mrp: 1299, category: 'clothing', stock: 50, thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop', description: 'Pure cotton polo t-shirt for casual wear.' },
    { id: 202, title: 'H&M Hooded Sweatshirt', price: 1999, mrp: 2499, category: 'clothing', stock: 20, thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', description: 'Soft cotton blend hoodie with a kangaroo pocket.' },
    { id: 203, title: 'Levi\'s Men\'s 511 Slim Jeans', price: 2899, mrp: 4299, category: 'clothing', stock: 35, thumbnail: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop', description: 'Modern slim sit with room to move.' },
    { id: 204, title: 'Zara Floral Summer Dress', price: 2590, mrp: 2990, category: 'clothing', stock: 12, thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', description: 'Flowy floral dress perfect for summer outings.' },

    // Footwear
    { id: 301, title: 'Nike Air Zoom Pegasus 39', price: 9495, mrp: 10495, category: 'footwear', stock: 10, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', description: 'Reliable daily trainer for runners of all levels.' },
    { id: 302, title: 'Adidas Originals Stan Smith', price: 7999, mrp: 8999, category: 'footwear', stock: 18, thumbnail: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop', description: 'Timeless tennis-inspired sneakers.' },
    { id: 303, title: 'Puma Men\'s Running Shoes', price: 2499, mrp: 4999, category: 'footwear', stock: 60, thumbnail: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop', description: 'Lightweight running shoes for daily use.' },
    { id: 304, title: 'Bata Formal Oxford Shoes', price: 1499, mrp: 1999, category: 'footwear', stock: 30, thumbnail: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop', description: 'Classic formal shoes for office wear.' },

    // Home
    { id: 401, title: 'Philips Smart Wi-Fi LED Bulb', price: 899, mrp: 1299, category: 'home', stock: 100, thumbnail: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop', description: '16 million colors, works with Alexa and Google Assistant.' },
    { id: 402, title: 'Milton Thermosteel Flask 1L', price: 945, mrp: 1190, category: 'home', stock: 45, thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', description: 'Keeps beverages hot or cold for 24 hours.' },
    { id: 403, title: 'Prestige Electric Kettle 1.5L', price: 799, mrp: 1295, category: 'home', stock: 25, thumbnail: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400&h=400&fit=crop', description: 'Stainless steel electric kettle with auto shut-off.' },
    { id: 404, title: 'Wakefit Orthopedic Mattress', price: 12999, mrp: 18999, category: 'home', stock: 5, thumbnail: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop', description: 'Orthopedic memory foam mattress for back pain relief.' },

    // Accessories
    { id: 501, title: 'Skybags Brat 2 Backpack', price: 1299, mrp: 2400, category: 'accessories', stock: 40, thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', description: 'Stylish and spacious backpack for college and work.' },
    { id: 502, title: 'Casio Vintage Series Watch', price: 1695, mrp: 1695, category: 'accessories', stock: 15, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', description: 'Digital watch with vintage design and daily alarm.' },
    { id: 503, title: 'Ray-Ban Aviator Sunglasses', price: 8490, mrp: 9990, category: 'accessories', stock: 8, thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop', description: 'Classic aviator sunglasses with UV protection.' },
    { id: 504, title: 'Tommy Hilfiger Leather Wallet', price: 2499, mrp: 4999, category: 'accessories', stock: 22, thumbnail: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop', description: 'Genuine leather wallet with multiple card slots.' },
];

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const enrichedProducts = STATIC_PRODUCTS.map(p => ({
                    ...p,
                    discountPercent: Math.round(((p.mrp - p.price) / p.mrp) * 100)
                }));

                await new Promise(resolve => setTimeout(resolve, 800));

                setProducts(enrichedProducts);

                const uniqueCategories = [...new Set(enrichedProducts.map(p => p.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error, categories };
};
