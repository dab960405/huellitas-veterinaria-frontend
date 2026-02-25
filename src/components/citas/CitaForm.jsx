// src/components/citas/CitaForm.jsx
import { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { mascotaService } from '../../services/api';

/**
 * Formulario para crear y editar citas veterinarias.
 * Carga dinámicamente la lista de mascotas para el select.
 * Valida que no se seleccionen fechas pasadas.
 * Impide marcar como COMPLETADA una cita futura.
 */
function CitaForm({ citaEdit, onSave, onCancel }) {

    const [formData, setFormData] = useState({
        fecha: '',
        hora: '',
        motivo: '',
        estado: 'PROGRAMADA',
        idMascota: ''
    });

    const [mascotas, setMascotas] = useState([]);

    /** Carga la lista de mascotas al montar el componente */
    useEffect(() => {
        loadMascotas();
    }, []);

    /** Carga los datos de la cita cuando se va a editar */
    useEffect(() => {
        if (citaEdit) {
            setFormData({
                fecha: citaEdit.fecha || '',
                hora: citaEdit.hora || '',
                motivo: citaEdit.motivo || '',
                estado: citaEdit.estado || 'PROGRAMADA',
                idMascota: citaEdit.idMascota || ''
            });
        }
    }, [citaEdit]);

    /** Obtiene las mascotas desde la API */
    const loadMascotas = async () => {
        try {
            const response = await mascotaService.getAll();
            setMascotas(response.data.data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        }
    };

    /** Maneja cambios en inputs */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * 🚨 ENVÍO CON VALIDACIONES COMPLETAS
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // ==============================
        // Validación campos obligatorios
        // ==============================
        if (!formData.fecha ||
            !formData.hora ||
            !formData.motivo.trim() ||
            !formData.idMascota) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        const fechaHoraSeleccionada = new Date(`${formData.fecha}T${formData.hora}`);
        const ahora = new Date();

        // ==============================
        // Validación fechas pasadas
        // ==============================
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaSolo = new Date(formData.fecha + 'T00:00:00');

        if (fechaSolo < hoy) {
            alert('No se permiten citas en fechas pasadas');
            return;
        }

        // ==============================
        // 🚫 No permitir COMPLETAR citas futuras
        // ==============================
        if (formData.estado === 'COMPLETADA' &&
            fechaHoraSeleccionada > ahora) {
            alert('No se puede marcar como COMPLETADA una cita que aún no ha ocurrido');
            return;
        }

        // ==============================
        // Enviar datos
        // ==============================
        const dataToSend = {
            ...formData,
            idMascota: parseInt(formData.idMascota)
        };

        onSave(dataToSend);
        resetForm();
    };

    /** Limpia el formulario */
    const resetForm = () => {
        setFormData({
            fecha: '',
            hora: '',
            motivo: '',
            estado: 'PROGRAMADA',
            idMascota: ''
        });
    };

    /** Cancela edición */
    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    /** Fecha mínima = hoy */
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    /**
     * Determina si la cita aún no ha ocurrido
     * (para deshabilitar COMPLETADA)
     */
    const esCitaFutura = () => {
        if (!formData.fecha || !formData.hora) return true;
        return new Date(`${formData.fecha}T${formData.hora}`) > new Date();
    };

    return (
        <div className="form-container">

            <h3>
                {citaEdit ? '✏️ Editar Cita' : '➕ Agendar Nueva Cita'}
            </h3>

            <form onSubmit={handleSubmit}>

                <div className="form-grid">

                    {/* Mascota */}
                    <div className="form-group">
                        <label>
                            Mascota (Paciente) <span className="required">*</span>
                        </label>

                        <select
                            name="idMascota"
                            value={formData.idMascota}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una mascota...</option>

                            {mascotas.map(mascota => (
                                <option
                                    key={mascota.idMascota}
                                    value={mascota.idMascota}
                                >
                                    {mascota.nombre}
                                    {' '}({mascota.especie} - {mascota.raza})
                                    {' '} - Dueño: {mascota.nombreDueno}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div className="form-group">
                        <label>
                            Fecha <span className="required">*</span>
                        </label>

                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            min={getTodayDate()}
                            required
                        />
                    </div>

                    {/* Hora */}
                    <div className="form-group">
                        <label>
                            Hora <span className="required">*</span>
                        </label>

                        <input
                            type="time"
                            name="hora"
                            value={formData.hora}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Estado (solo edición) */}
                    {citaEdit && (
                        <div className="form-group">
                            <label>Estado</label>

                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                            >
                                <option value="PROGRAMADA">
                                    Programada
                                </option>

                                <option
                                    value="COMPLETADA"
                                    disabled={esCitaFutura()}
                                >
                                    Completada
                                </option>

                                <option value="CANCELADA">
                                    Cancelada
                                </option>
                            </select>
                        </div>
                    )}

                    {/* Motivo */}
                    <div
                        className="form-group"
                        style={{ gridColumn: '1 / -1' }}
                    >
                        <label>
                            Motivo de la cita <span className="required">*</span>
                        </label>

                        <textarea
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChange}
                            placeholder="Ej: Vacunación anual, control general..."
                            rows="3"
                            required
                        />
                    </div>

                </div>

                {/* Botones */}
                <div className="form-buttons">

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        <FaSave />
                        {' '}
                        {citaEdit ? 'Actualizar' : 'Agendar Cita'}
                    </button>

                    {citaEdit && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            <FaTimes />
                            {' '}
                            Cancelar
                        </button>
                    )}

                </div>

            </form>
        </div>
    );
}

export default CitaForm;