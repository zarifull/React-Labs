import { useCartStore } from '../store/useCartStore';
import styles from './Cart.module.css'; 

export const CartDisplay = () => {
    const { cart, removeFromCart, clearCart } = useCartStore();

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    return (
        <div className={styles.cartContainer}>
            <h2>🛒 Your Galaxy Cart</h2>
            
            {cart.length === 0 ? (
                <p>The cart is empty. Go get some gear!</p>
            ) : (
                <ul className={styles.cartList}>
                    {cart.map((item) => (
                        <li key={item.id} className={styles.cartItem}>
                            <span>
                                🚀 {item.title} — <strong>${item.price}</strong> x {item.quantity}
                            </span>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className={styles.removeBtn}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {cart.length > 0 && (
                <div className={styles.totalSection}>
                    <h3>Total Investment: ${total}</h3>
                    <button onClick={clearCart} className={styles.clearBtn}>
                        Clear Galaxy Cart
                    </button>
                </div>
            )}
        </div>
    );
};