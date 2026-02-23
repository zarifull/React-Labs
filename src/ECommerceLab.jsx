import { ProductList } from './ecomerce/Productlist';
import { CartDisplay } from './ecomerce/cartDisplay';
import { Link } from 'react-router-dom';
import styles from './ecomerce/Ecom.module.css';

const ECommerceLab = () => {
  return (
    <div className={styles.lab_container}>
       <Link to="/" style={{ margin: '20px', display: 'block',color:'#4834d4', fontWeight:'bold',textAlign:'left' }}>
          ← Back to Home
      </Link>
      <h1 className={styles.main_title}>🚀 E-Commerce</h1>
      {/* Our TSX components living inside a JSX file! */}
      <ProductList />
      <CartDisplay />
    </div>
  );
};

export default ECommerceLab;