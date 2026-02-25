// src/services/api.js
import axios from 'axios';

/**
 * Configuración base de Axios para comunicarse con el Backend.
 * Base URL apunta al servidor Spring Boot en puerto 8080.
 */
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// ==========================================
// SERVICIOS DE DUEÑOS
// ==========================================

export const duenoService = {
    /** Obtiene todos los dueños */
    getAll: () => api.get('/duenos'),

    /** Obtiene un dueño por ID */
    getById: (id) => api.get(`/duenos/${id}`),

    /** Crea un nuevo dueño */
    create: (data) => api.post('/duenos', data),

    /** Actualiza un dueño existente */
    update: (id, data) => api.put(`/duenos/${id}`, data),

    /** Elimina un dueño */
    delete: (id) => api.delete(`/duenos/${id}`),

    /** Busca dueños por término */
    search: (termino) => api.get(`/duenos/buscar?termino=${termino}`)
};

// ==========================================
// SERVICIOS DE MASCOTAS
// ==========================================

export const mascotaService = {
    /** Obtiene todas las mascotas */
    getAll: () => api.get('/mascotas'),

    /** Obtiene una mascota por ID */
    getById: (id) => api.get(`/mascotas/${id}`),

    /** Crea una nueva mascota */
    create: (data) => api.post('/mascotas', data),

    /** Actualiza una mascota existente */
    update: (id, data) => api.put(`/mascotas/${id}`, data),

    /** Elimina una mascota */
    delete: (id) => api.delete(`/mascotas/${id}`),

    /** Busca mascotas por término (nombre o documento del dueño) */
    search: (termino) => api.get(`/mascotas/buscar?termino=${termino}`),

    /** Obtiene mascotas de un dueño específico */
    getByDueno: (idDueno) => api.get(`/mascotas/dueno/${idDueno}`)
};

// ==========================================
// SERVICIOS DE CITAS
// ==========================================

export const citaService = {
    /** Obtiene todas las citas */
    getAll: () => api.get('/citas'),

    /** Obtiene una cita por ID */
    getById: (id) => api.get(`/citas/${id}`),

    /** Crea una nueva cita */
    create: (data) => api.post('/citas', data),

    /** Actualiza una cita existente */
    update: (id, data) => api.put(`/citas/${id}`, data),

    /** Elimina una cita */
    delete: (id) => api.delete(`/citas/${id}`),

    /** Obtiene citas de una mascota específica */
    getByMascota: (idMascota) => api.get(`/citas/mascota/${idMascota}`)
};

export default api;