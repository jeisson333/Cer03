import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { FaTrashRestore } from "react-icons/fa";
import { restoreProduct } from "../../redux/actions";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getSucursales,
  getDeleteProducts,
  getDisabledEmpresas,
} from "../../redux/actions";
import Filters from "../../components/Filters/Filters";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

import Style from "./RestoreEmpresa.module.css";

const cookies = new Cookies();

function RestoreEmpresa() {
  const dispatch = useDispatch();
  const { idBranch, branch } = cookies.get("auth");
  const [flagRestoreEmpresa, setFlagRestoreEmpresa] = useState(false);
  const { disabledEmpresas } = useSelector((state) => state);
  const [itemsBorrados, SetItemsBorrados] = useState([]);

  useEffect(() => {
    dispatch(getDisabledEmpresas());
  }, [flagRestoreEmpresa]);

  const handleRestoreEmpresa = (id_empresa) => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restauralo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Restauracion exitosa!",
          text: "La empresa ha sido restaurada!",
          icon: "success",
        });
        // Si el usuario ha confirmado, ejecuta la acción de borrar el producto
        await axios.put(`${baseUrl}/developers/restore?branch=${id_empresa}`);
        setFlagRestoreEmpresa(!flagRestoreEmpresa);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <h2>Empresas Baneadas</h2>
      </div>

      <div className="flex justify-center">
        <table className={Style.table}>
          <thead>
            <tr>
              <th className={Style.cell}>Empresa</th>
              <th className={Style.cell}>Cantidad de sucursales</th>
              <th className={Style.cell}>Restaurar</th>
            </tr>
          </thead>
          <tbody>
            {disabledEmpresas?.map((empresa, index) => (
              <tr key={index}>
                <td className={Style.cell}>{empresa?.nombre_empresa}</td>
                <td className={Style.cell}>{empresa?.count}</td>
                <td className={Style.cell}>
                  <button
                    onClick={() => handleRestoreEmpresa(empresa.id_empresa)}
                  >
                    <FaTrashRestore />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestoreEmpresa;
