import { useSelector } from "react-redux";
import Product from "../Product/Product";

//styles
import styles from "./Products.module.css";

const Products = () => {
  const products = useSelector((state) => state.products);

  return (
    <div className={styles.container}>
      {products?.map((product, index) => {
        return <Product key={index} product={product} />;
      })}
    </div>
  );
};

export default Products;
