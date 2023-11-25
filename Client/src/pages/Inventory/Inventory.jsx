import React from 'react';
import { products } from "../../data/products";
import Style from './inventory.module.css'

const Inventory = () => {
    return (
        <div>
            <h1>Inventory</h1>
            <div className={Style.cardContainer}>
                {products.map(product => (
                    <div key={product.id} className={Style.card}>
                        <img src={product.imagen} alt={product.name} />
                        <div className={Style.cardDetails}>
                            <h2>{product.name}</h2>
                            <p>Precio: ${product.precio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
