import * as React from "react";
//import axios from "axios";
import { useForm } from "react-hook-form";

export function CreateProduct() {
  const {
    register,
    handleSubmit,
    control,
    submissionId,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre_producto: "",
      tipo_producto: "",
      peso: "",
      image: "",
      valor_compra: "",
      valor_venta: "",
    },
  });

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cargar producto</h1>

      <div>
        <label>
          <span>Nombre del Producto</span>
          <input
            {...register("nombre_producto", {
              required: "Please fill in this field.",
            })}
            aria-invalid={errors.nombre_producto ? "true" : "false"}
            type="text"
          />
        </label>
        {errors.nombre_producto && (
          <p role="alert">{(errors, nombre_producto?.message)}</p>
        )}
      </div>

      <div>
        <label>
          <span>Tipo de producto</span>
          <select {...register("tipo_producto")}></select>
        </label>
      </div>

      <div>
        <label>
          <span>peso</span>
          <input {...register("peso")} type="number" />
        </label>
      </div>

      <div>
        <label>
          <span>Imagen</span>
          <input {...register("image")} type="url" />
        </label>
      </div>

      <div>
        <label>
          <span>Valor compra</span>
          <input {...register("valor-compra")} type="number" />
        </label>
      </div>

      <div>
        <label>
          <span>Valor venta</span>
          <input {...register("valor-venta")} type="number" />
        </label>
      </div>

      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}
