import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from "axios";

const Detail = ({ idBranch }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const name = query.get('name');
    const sucursal = query.get('sucursal');

    const [product, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(`http://localhost:3001/products/?name=${name}&sucursal=${sucursal}`, {
                    id: idBranch,
                });
                setProducts(data.data);
            } catch (error) {
                throw Error(error.message);
            }
        })();
    }, []);
    return (
        <div>
            <div>
                <h2>{product[0]?.PRODUCTO?.nombre_producto}</h2>
                <img src={product[0]?.PRODUCTO?.image} alt={product[0]?.PRODUCTO?.nombre_producto} />
            </div>
            <div>
                <p>Sucursal: {product[0]?.SUCURSAL.nombre_sucursal}</p>
                <p>Catalogo Universal: {product[0]?.PRODUCTO?.CATALOGO_UNIVERSAL?.nombre_catalogo}</p>
                <p>Peso: {product[0]?.PRODUCTO?.peso}</p>
                <p>Valor Compra: {product[0]?.PRODUCTO?.valor_compra}</p>
                <p>Valor Venta: {product[0]?.PRODUCTO?.valor_venta}</p>
            </div>
        </div>
    )
}

export default Detail