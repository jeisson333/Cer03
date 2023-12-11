import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaTrashRestore } from "react-icons/fa";
import { restoreProduct } from "../../redux/actions";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const cookies = new Cookies();

function Papelera({}) {
  const dispatch = useDispatch();
  const { idBranch, branch } = cookies.get("auth");
  const [flagRestoreProduct, setFlagRestoreProduct] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;
  const [itemsBorrados, SetItemsBorrados] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.post(`${url}/products/deletesProducts`, {
          id: idBranch,
        });
        console.log(data);
        SetItemsBorrados(data.data.data);
      } catch (error) {}
    })();
  }, [flagRestoreProduct]);

  // console.log(data?.data.data[0]?.PRODUCTO?.id_producto);
  const handleRestoreProduct = (id_inventario_producto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Restaurar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restauralo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Restore!",
          text: "Your file has been Restore.",
          icon: "success",
        });
        // Si el usuario ha confirmado, ejecuta la acción de borrar el producto
        await dispatch(restoreProduct(id_inventario_producto, branch));
        setFlagRestoreProduct(!flagRestoreProduct);
      }
    });
  };

  return (
    <div className="flex justify-center">
      <table className="table-auto border-collapse border border-blue-800">
        <thead>
          <tr>
            <th className="border border-blue-600 p-3">Imagen</th>
            <th className="border border-blue-600 p-3">Nombre</th>
            <th className="border border-blue-600 p-3">Tipo</th>
            <th className="border border-blue-600 p-3">Sucursal</th>
            <th className="border border-blue-600 p-3">Restaurar</th>
          </tr>
        </thead>
        <tbody>
          {itemsBorrados?.map((product, index) => (
            <tr key={index}>
              <td className="border border-blue-600 p-3">
                <img
                  src={product?.PRODUCTO?.image}
                  alt={product?.PRODUCTO?.nombre_producto}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </td>
              <td className="border border-blue-600 p-3">
                {product?.PRODUCTO?.nombre_producto}
              </td>
              <td className="border border-blue-600 p-3">
                {product?.PRODUCTO?.CATALOGO_UNIVERSAL?.nombre_catalogo}
              </td>
              <td className="border border-blue-600 p-3">
                {product?.SUCURSAL.nombre_sucursal}
              </td>
              <td className="border border-blue-600 p-3">
                <button
                  onClick={() =>
                    handleRestoreProduct(product?.id_inventario_producto)
                  }
                >
                  <FaTrashRestore />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Papelera;
