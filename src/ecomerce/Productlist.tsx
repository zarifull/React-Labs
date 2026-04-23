import { useCartStore } from '../store/useCartStore';
import type { Product } from '../types/product';
import styles from './Ecom.module.css'; 

const DUMMY_PRODUCTS: Product[] = [
    {
      id: 1,
      title: 'iPhone 15 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
      description: 'Latest flagship smartphone with titanium design.'
    },
    {
      id: 2,
      title: 'Sony WH-1000XM5',
      price: 350,
      image: 'https://images.unsplash.com/photo-1618366712277-70f39e5707ec?auto=format&fit=crop&q=80&w=800',
      description: 'Industry-leading noise canceling headphones.'
    },
    {
      id: 3,
      title: 'MacBook Air M3',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      description: 'Thinner, lighter, and faster than ever.'
    },
    {
      id: 4,
      title: 'Mechanical Keyboard',
      price: 120,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
      description: 'Tactile typing experience with RGB backlighting.'
    },
    {
      id: 5,
      title: 'Espresso Maker',
      price: 250,
      image: 'https://images.unsplash.com/photo-1510525923062-f4993ec19131?auto=format&fit=crop&q=80&w=800',
      description: 'Professional grade coffee for your home office.'
    },
    {
      id: 6,
      title: 'Smart Watch',
      price: 299,
      image: 'https://images.unsplash.com/photo-1544117518-30dd0f787a38?auto=format&fit=crop&q=80&w=800',
      description: 'Track your health and notifications on the go.'
    }
  ];

  export const ProductList = () => {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Available Gear</h2>
            <div className={styles.productGrid}>
                {DUMMY_PRODUCTS.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <h3 className={styles.productTitle}>{product.title}</h3>
                        <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                className={styles.productImage} 
                            />
                        </div>
                        <p className={styles.price}>${product.price}</p>
                        <p className={styles.productDescription}>{product.description}</p>
                        <button 
                            onClick={() => addToCart(product)}
                            className={styles.buyBtn}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};