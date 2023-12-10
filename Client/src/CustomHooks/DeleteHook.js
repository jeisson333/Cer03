import { useCallback } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteProduct } from "./actions"; // Asegúrate de importar la acción correcta
import { useNavigate } from "react-router-dom";

const useDeleteProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProduct = useCallback(
    (product, branch, setProducts) => {
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
    },
    [dispatch, navigate]
  );

  return handleDeleteProduct;
};

export default useDeleteProduct;
