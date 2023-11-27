const { PRODUCTO, SUCURSAL, INVENTARIO_PRODUCTO } = require("../database/db");

const newProduct = async ({ values }) => {
  if (!values?.idBranch) throw new Error("The query need Product's branch");

  const BranchProductPromise = SUCURSAL.findAll({
    where: {
      sucursal_empresa: values?.idBranch,
    },
  });

  const newProductPromise = PRODUCTO.findOrCreate({
    where: {
      nombre_producto: values?.nombre_producto,
      image: values?.image,
      peso: values?.peso,
      valor_venta: values?.valor_venta,
      valor_compra: values?.valor_compra,
    },
  });
  const [BranchProduct, [newProduct]] = await Promise.all([
    BranchProductPromise,
    newProductPromise,
  ]);
  newProduct.setCATALOGO_UNIVERSAL(values?.tipo_producto);
  newProduct.setEMPRESA(values?.idBranch);

  for (let index = 0; index < BranchProduct.length; index++) {
    let [inventoryNewProduct] = await INVENTARIO_PRODUCTO.findOrCreate({
      where: {
        stock: 0,
        inventario_producto: newProduct?.id_producto,
        inventario_sucursal: BranchProduct[index]?.id_sucursal,
      },
    });
    inventoryNewProduct.setPRODUCTO(newProduct?.id_producto);
    inventoryNewProduct.setSUCURSAL(BranchProduct[index]?.id_sucursal);
  }
};

module.exports = {
  newProduct,
};
