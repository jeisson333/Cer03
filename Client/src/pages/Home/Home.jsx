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
      Concepto: "Regla",
      Valor: 1.2,
      Estado: "Pagado",
    },
    {
      Concepto: "Goma de borrar",
      Valor: 0.75,
      Estado: "Pendiente",
    },
    {
      Concepto: "Plumón",
      Valor: 3.5,
      Estado: "Pendiente",
    },
    {
      Concepto: "Pegamento",
      Valor: 1.8,
      Estado: "Pagado",
    },
    {
      Concepto: "Calculadora",
      Valor: 10.99,
      Estado: "Pendiente",
    },
    {
      Concepto: "Resaltador",
      Valor: 1.25,
      Estado: "Pagado",
    },
    {
      Concepto: "Cinta adhesiva",
      Valor: 1.5,
      Estado: "Pendiente",
    },
    {
      Concepto: "Tijeras",
      Valor: 2.0,
      Estado: "Pagado",
    },
    {
      Concepto: "Folder",
      Valor: 2.75,
      Estado: "Pendiente",
    },
    {
      Concepto: "Corrector líquido",
      Valor: 1.9,
      Estado: "Pagado",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.movimientos}`}>
        <h2>Movimientos</h2>
        <button className={styles.buttonNv}>Nueva venta</button>

        <button>Nuevo gasto</button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.filtrosContainer}>
        <button className={styles.buttons}>
          <FaFilterCircleDollar /> Filtrar
        </button>
        <button className={styles.buttons}>
          <FaListOl /> Ordenar
        </button>
        <div className={styles.buttonContainer}>
          {/* <CiSearch /> */}
          <input
            type="search"
            placeholder="Buscar concepto..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.divider}></div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Valor</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.Concepto}</td>
              <td>{producto.Valor}</td>
              <td>{producto.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
