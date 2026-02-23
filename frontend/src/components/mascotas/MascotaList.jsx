// src/components/mascotas/MascotaList.jsx
import { FaEdit, FaTrash } from 'react-icons/fa';

/**
 * Tabla que muestra la lista de mascotas con edad calculada.
 */
function MascotaList({ mascotas, onEdit, onDelete }) {

    const handleDelete = (id, nombre) => {
        if (window.confirm(`¿Está seguro de eliminar a ${nombre}? Se eliminarán también sus citas.`)) {
            onDelete(id);
        }
    };

    if (mascotas.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state__icon">🐕</div>
                <p>No hay mascotas registradas aún</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Dueño</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.map(mascota => (
                        <tr key={mascota.idMascota}>
                            <td>{mascota.idMascota}</td>
                            <td>{mascota.nombre}</td>
                            <td>{mascota.especie}</td>
                            <td>{mascota.raza}</td>
                            <td>{mascota.edad}</td>
                            <td>{mascota.nombreDueno}</td>
                            <td>
                                <div className="actions">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onEdit(mascota)}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(mascota.idMascota, mascota.nombre)}
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MascotaList;