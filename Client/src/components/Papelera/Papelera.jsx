import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaTrashRestore } from "react-icons/fa";
import { restoreProduct } from "../../redux/actions";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getSucursales, getDeleteProducts } from "../../redux/actions";
import Filters from "../../components/Filters/Filters";
import Style from "./Papelera.module.css";

const cookies = new Cookies();

function Papelera() {
  const dispatch = useDispatch();
  const { idBranch, branch } = cookies.get("auth");
  const [flagRestoreProduct, setFlagRestoreProduct] = useState(false);
  const totalPages = useSelector((state) => state.totalPages);
  const sucursales = useSelector((state) => state.sucursales);
  const [search, setSearch] = useState("");
  const [conditions, setConditions] = useState({
    sucursal: branch ? branch : sucursales[0]?.nombre_sucursal,
    page: 1,
    page_size: 15,
  });
  const [itemsBorrados, SetItemsBorrados] = useState([]);

  useEffect(() => {
    dispatch(getSucursales(idBranch));
  }, []);

  useEffect(() => {
    if (conditions.sucursal) {
      dispatch(getDeleteProducts(idBranch, conditions)).then((data) => {
        if (data && data.payload) {
          SetItemsBorrados(data.payload.data);
        } else {
          console.log("Data is not in the expected format:", data);
        }
      });
    }
  }, [conditions, flagRestoreProduct]);

  // console.log(data?.data.data[0]?.PRODUCTO?.id_producto);
  const handleRestoreProduct = (id_inventario_producto) => {
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

  const handlerChange = (event) => {
    setSearch(event.target.value);
  };

  const handlerSubmit = () => {
    setConditions({
      ...conditions,
      name: search,
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <h2 className={Style.title}>Productos Eliminados</h2>
      </div>
      <Filters
        conditions={conditions}
        setConditions={setConditions}
        sucursales={sucursales}
        totalPages={totalPages}
        handlerChange={handlerChange}
        handlerSubmit={handlerSubmit}
      />
      <div className="flex justify-center">
        <table className={Style.table}>
          <thead>
            <tr>
              <th className={Style.cell}>Imagen</th>
              <th className={Style.cell}>Nombre</th>
              <th className={Style.cell}>Tipo</th>
              <th className={Style.cell}>Sucursal</th>
              <th className={Style.cell}>Restaurar</th>
            </tr>
          </thead>
          <tbody>
            {itemsBorrados?.map((product, index) => (
              <tr key={index}>
                <td className={Style.cell}>
                  <img
                    src={product?.PRODUCTO?.image}
                    alt={product?.PRODUCTO?.nombre_producto}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </td>
                <td className={Style.cell}>
                  {product?.PRODUCTO?.nombre_producto}
                </td>
                <td className={Style.cell}>
                  {product?.PRODUCTO?.CATALOGO_UNIVERSAL?.nombre_catalogo}
                </td>
                <td className={Style.cell}>
                  {product?.SUCURSAL.nombre_sucursal}
                </td>
                <td className={Style.cell}>
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
    </div>
  );
}

export default Papelera;
