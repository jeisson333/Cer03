function Papelera({ data }) {
  function restaurarItem(id) {
    // Aquí puedes agregar la lógica para restaurar el item
    console.log(`Restaurar item con id: ${id}`);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Sucursal</th>
          <th>Fecha de Eliminación</th>
          <th>Restaurar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <img src={item.imagen} alt={item.nombre} />
            </td>
            <td>{item.nombre}</td>
            <td>{item.tipo}</td>
            <td>{item.sucursal}</td>
            <td>{item.fechaEliminacion}</td>
            <td>
              <button onClick={() => restaurarItem(item.id)}>Restaurar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Papelera;
