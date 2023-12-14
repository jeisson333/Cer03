import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTotalEmpresas } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

import Style from "./BanEmpresas.module.css";

const BanEmpresa = () => {
  const dispatch = useDispatch();
  const { totalEmpresas } = useSelector((state) => state);

  const [flagDeleteEmpresa, setFlagDeleteEmpresa] = useState(false);

  useEffect(() => {
    dispatch(getTotalEmpresas());
  }, [flagDeleteEmpresa]);

  const handleDeleteEmpresa = (id_empresa) => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Baneo exitoso!",
          text: "La empresa ha sido baneada!",
          icon: "success",
        });
        // Si el usuario ha confirmado, ejecuta la acción de borrar el producto
        // await dispatch(deleteProduct(id_producto, branch));
        // dispatch(getTotalEmpresas());
        await axios.delete(`${baseUrl}/developers/delete?branch=${id_empresa}`);
        setFlagDeleteEmpresa(!flagDeleteEmpresa);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <h2 className={Style.title}>Empresas Actuales</h2>
      </div>

      <div className="flex justify-center">
        <table className={Style.table}>
          <thead>
            <tr>
              <th className={Style.cell}>Empresa</th>
              <th className={Style.cell}>Cantidad de sucursales</th>
              <th className={Style.cell}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {totalEmpresas?.map((empresa, index) => (
              <tr key={index}>
                <td className={Style.cell}>{empresa?.nombre_empresa}</td>
                <td className={Style.cell}>{empresa?.count}</td>
                <td className={Style.cell}>
                  <button
                    onClick={() => handleDeleteEmpresa(empresa.id_empresa)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BanEmpresa;
