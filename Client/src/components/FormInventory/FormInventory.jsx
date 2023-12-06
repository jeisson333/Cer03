import React, { useState } from "react";

const handleSubmit = (event) => {
  event.preventDefault();
};

const FormInventory = () => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <h2>Detalle del Producto</h2>
        </div>

        <div>
          <label>Stock actual:</label>
        </div>

        <div>
          <label>Sucursal</label>
          <select id="sucursal" value={stockSucursal}>
            <option></option>
          </select>
        </div>

        <div>
          <label>Stock</label>
          <input type="number" min={1} name="stockCount" value={stockCount} />
        </div>
      </div>
    </form>
  );
};
export default FormInventory;
