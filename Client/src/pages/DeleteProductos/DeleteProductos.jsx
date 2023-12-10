import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSucursales } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const DeleteProductos = () => {
  const dispatch = useDispatch();
  const { idBranch, branch } = cookies.get("auth");
  const [products, setProducts] = useState([]);
  const sucursales = useSelector((state) => state.sucursales);
  const [conditions, setConditions] = useState({
    sucursal: branch ? branch : sucursales[0]?.nombre_sucursal,
  });

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
  }, [conditions]);

  const handleDeleteProduct = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        // Si el usuario ha confirmado, ejecuta la acción de borrar el producto
        dispatch(deleteProduct(product[0]?.PRODUCTO?.id_producto, branch));
        setProducts({});
        navigate("/products");
      }
    });
  };

  return (
    <div>
      <div>
        <h2>Productos</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Sucursal</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_producto}>
              <td>
                <img
                  src={product.image}
                  alt={product.nombre_producto}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </td>
              <td>{product.nombre_producto}</td>
              <td>
                {product.CATALOGO_UNIVERSAL &&
                  product.CATALOGO_UNIVERSAL.nombre_catalogo}
              </td>
              <td>{product.sucursal}</td>
              <td>
                <button onClick={handleDeleteProduct}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteProductos;
