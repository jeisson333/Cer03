import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSucursales } from "../../redux/actions";
import { deleteProduct } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Filters from "../../components/Filters/Filters";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import Style from "./DeleteProductos.module.css";
const cookies = new Cookies();

const DeleteProductos = () => {
  const dispatch = useDispatch();
  const { idBranch, branch } = cookies.get("auth");
  const [products, setProducts] = useState([]);
  const totalPages = useSelector((state) => state.totalPages);
  const sucursales = useSelector((state) => state.sucursales);
  const [search, setSearch] = useState("");
  const [conditions, setConditions] = useState({
    sucursal: branch ? branch : sucursales[0]?.nombre_sucursal,
    page: 1,
    page_size: 15,
  });
  const [flagDeleteProduct, setFlagDeleteProduct] = useState(false);

  useEffect(() => {
    dispatch(getSucursales(idBranch));
  }, []);

  useEffect(() => {
    if (conditions.sucursal) {
      dispatch(getProducts(idBranch, conditions)).then((data) => {
        if (data && data.payload) {
          setProducts(data.payload.data);
        } else {
          console.log("Data is not in the expected format:", data);
        }
      });
    }
  }, [conditions, flagDeleteProduct]);

  const handleDeleteProduct = (id_producto) => {
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
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        // Si el usuario ha confirmado, ejecuta la acción de borrar el producto
        await dispatch(deleteProduct(id_producto, conditions?.sucursal));
        setFlagDeleteProduct(!flagDeleteProduct);
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
        <h2>Productos</h2>
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
              <th className={Style.cell}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
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
                    onClick={() => {
                      setConditions({
                        ...conditions,
                        sucursal: product?.SUCURSAL.nombre_sucursal,
                      });
                      handleDeleteProduct(product?.PRODUCTO?.id_producto);
                    }}
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

export default DeleteProductos;
