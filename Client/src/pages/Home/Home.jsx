import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { FaListOl } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function Home({ idBranch }) {
  // const [sales, setSales] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.post("http://localhost:3001/ventas", {
  //         id: idBranch,
  //       });

  //       setSales(data.data);
  //     } catch (error) {
  //       throw Error(error.message);
  //     }
  //   })();
  // }, []);
  // console.log(sales);
  const productos = [
    {
      Producto: "Zanahorias",
      Valor: 500,
      Concepto: "Venta",
    },
    {
      Producto: "Limones",
      Valor: 100,
      Concepto: "Compra",
    },
    {
      Producto: "Arroz",
      Valor: 100,
      Concepto: "Compra",
    },
    {
      Producto: "Cereal",
      Valor: 300,
      Concepto: "Venta",
    },
    {
      Producto: "Carne",
      Valor: 800,
      Concepto: "Compra",
    },
    {
      Producto: "Remolacha",
      Valor: 400,
      Concepto: "Venta",
    },
    {
      Producto: "Caramelos",
      Valor: 100,
      Concepto: "Compra",
    },
    {
      Producto: "Tomates",
      Valor: 300,
      Concepto: "Venta",
    },
    {
      Producto: "Atun",
      Valor: 1000,
      Concepto: "Compra",
    },
    {
      Producto: "Carne",
      Valor: 2000,
      Concepto: "Venta",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.movimientos}`}>
        <h2>Movimientos</h2>
        {/*
        <button className={styles.buttonNv}>Nueva venta</button>


          <button>Nuevo gasto</button> 
        */}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.filtrosContainer}>
        {/*
        <button className={styles.buttons}>
          <FaFilterCircleDollar /> Filtrar
        </button>
        <button className={styles.buttons}>
          <FaListOl /> Ordenar
        </button>
        <div className={styles.buttonContainer}>
         
          <input
            type="search"
            placeholder="Buscar concepto..."
            className={styles.searchInput}
          />
        </div>
    );
    */}
      </div>

      <div className={styles.divider}></div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Valor $</th>
            <th>Concepto</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.Producto}</td>
              <td>{producto.Valor}</td>
              <td>{producto.Concepto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
