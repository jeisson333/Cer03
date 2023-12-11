const { PRODUCTO, SUCURSAL, INVENTARIO_PRODUCTO } = require('../database/db');
require('dotenv').config();
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

const multer = require('multer'); // Middleware para gestionar archivos para cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_KEY,
	api_secret: CLOUD_SECRET,
});

// Configurar Multer para gestionar archivos en la solicitud

const newProduct = async ({ values, result }) => {
	if (!values?.idBranch) throw new Error("The query need Product's branch");

	const BranchProductPromise = SUCURSAL.findAll({
		where: {
			sucursal_empresa: values?.idBranch,
		},
	});
	// para cloudinary

	const newProductPromise = PRODUCTO.findOrCreate({
		where: {
			nombre_producto: values?.nombre_producto,
			image: result?.secure_url, //URL de la imagen en Cloudinary
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

	for (let index = 0; index < values?.stock.length; index++) {
		let [inventoryNewProduct] = await INVENTARIO_PRODUCTO.findOrCreate({
			where: {
				stock: values?.stock[index].count,
				inventario_producto: newProduct?.id_producto,
				inventario_sucursal: values?.stock[index].id,
			},
		});
		inventoryNewProduct.setPRODUCTO(newProduct?.id_producto);
		inventoryNewProduct.setSUCURSAL(values?.stock[index].id);
	}
	return { msg: 'Se creo el producto exitosamente' };
};

module.exports = {
	newProduct,
};
