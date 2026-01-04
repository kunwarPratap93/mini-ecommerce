import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import styles from './Checkout.module.css';

const Checkout = ({ isOpen, onClose }) => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState('details'); // 'details', 'payment', 'success'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [orderDetails, setOrderDetails] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePayment = () => {
        // Generate order details
        const order = {
            orderId: 'ORD' + Date.now(),
            date: new Date().toLocaleString('en-IN'),
            items: cartItems,
            total: totalPrice,
            customer: formData,
            paymentMethod: paymentMethod
        };

        setOrderDetails(order);
        setStep('success');

        // Clear cart after showing success
        setTimeout(() => {
            clearCart();
        }, 1000);
    };

    const handleClose = () => {
        setStep('details');
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            pincode: ''
        });
        setPaymentMethod('card');
        setOrderDetails(null);
        onClose();
    };

    const downloadReceipt = () => {
        const receiptContent = `
MINIMARKET - ORDER RECEIPT
═══════════════════════════════════════

Order ID: ${orderDetails.orderId}
Date: ${orderDetails.date}

CUSTOMER DETAILS
───────────────────────────────────────
Name: ${orderDetails.customer.name}
Email: ${orderDetails.customer.email}
Phone: ${orderDetails.customer.phone}
Address: ${orderDetails.customer.address}
City: ${orderDetails.customer.city}
Pincode: ${orderDetails.customer.pincode}

ORDER ITEMS
───────────────────────────────────────
${orderDetails.items.map(item =>
            `${item.title}
Qty: ${item.quantity} × ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.quantity)}`
        ).join('\n\n')}

───────────────────────────────────────
TOTAL: ${formatCurrency(orderDetails.total)}
───────────────────────────────────────

Payment Method: ${orderDetails.paymentMethod.toUpperCase()}
Status: PAID

Thank you for shopping with MiniMarket!
═══════════════════════════════════════
        `;

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Receipt_${orderDetails.orderId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={handleClose} />

            <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2>Checkout</h2>
                    <button onClick={handleClose} className={styles.closeBtn}>
                        <X size={24} />
                    </button>
                </div>

                {step === 'success' && orderDetails ? (
                    <div className={styles.successMessage}>
                        <CheckCircle size={64} className={styles.successIcon} />
                        <h3>Order Placed Successfully!</h3>
                        <p className={styles.orderId}>Order ID: {orderDetails.orderId}</p>
                        <p>Thank you for your purchase.</p>
                        <p className={styles.totalPaid}>Amount Paid: {formatCurrency(orderDetails.total)}</p>

                        <div className={styles.receiptSection}>
                            <h4>Order Summary</h4>
                            {orderDetails.items.map((item) => (
                                <div key={item.id} className={styles.receiptItem}>
                                    <span>{item.title} (×{item.quantity})</span>
                                    <span>{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}
                            <div className={styles.receiptTotal}>
                                <span>Total:</span>
                                <span>{formatCurrency(orderDetails.total)}</span>
                            </div>
                        </div>

                        <button onClick={downloadReceipt} className={styles.downloadBtn}>
                            Download Receipt
                        </button>
                        <button onClick={handleClose} className={styles.continueBtn}>
                            Continue Shopping
                        </button>
                    </div>
                ) : step === 'payment' ? (
                    <div className={styles.content}>
                        <div className={styles.paymentSection}>
                            <h3>Select Payment Method</h3>

                            <div className={styles.paymentMethods}>
                                <div
                                    className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <CreditCard size={24} />
                                    <span>Credit/Debit Card</span>
                                </div>

                                <div
                                    className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('upi')}
                                >
                                    <Smartphone size={24} />
                                    <span>UPI</span>
                                </div>

                                <div
                                    className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <Wallet size={24} />
                                    <span>Cash on Delivery</span>
                                </div>
                            </div>

                            <div className={styles.orderSummary}>
                                <h4>Order Summary</h4>
                                <div className={styles.items}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className={styles.item}>
                                            <img src={item.thumbnail} alt={item.title} />
                                            <div className={styles.itemDetails}>
                                                <p className={styles.itemTitle}>{item.title}</p>
                                                <p className={styles.itemQty}>Qty: {item.quantity}</p>
                                            </div>
                                            <p className={styles.itemPrice}>
                                                {formatCurrency(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.total}>
                                    <span>Total Amount:</span>
                                    <span className={styles.totalAmount}>{formatCurrency(totalPrice)}</span>
                                </div>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button onClick={() => setStep('details')} className={styles.backBtn}>
                                    Back
                                </button>
                                <button onClick={handlePayment} className={styles.payBtn}>
                                    Pay {formatCurrency(totalPrice)}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <div className={styles.orderSummary}>
                            <h3>Order Summary</h3>
                            <div className={styles.items}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.item}>
                                        <img src={item.thumbnail} alt={item.title} />
                                        <div className={styles.itemDetails}>
                                            <p className={styles.itemTitle}>{item.title}</p>
                                            <p className={styles.itemQty}>Qty: {item.quantity}</p>
                                        </div>
                                        <p className={styles.itemPrice}>
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.total}>
                                <span>Total:</span>
                                <span className={styles.totalAmount}>{formatCurrency(totalPrice)}</span>
                            </div>
                        </div>

                        <form onSubmit={handleDetailsSubmit} className={styles.form}>
                            <h3>Delivery Details</h3>

                            <div className={styles.formGroup}>
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className={styles.placeOrderBtn}>
                                Continue to Payment
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkout;
