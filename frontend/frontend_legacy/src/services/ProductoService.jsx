// Apuntamos directo al API Gateway en el puerto 8080
const API_URL = 'http://localhost:8080/api/v1/productos';

export const ProductoService = {
    getAll: async () => {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error fetching productos");
        return res.json();
    },
    getById: async (id) => {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Error fetching producto");
        return res.json();
    },
    create: async (producto) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!res.ok) throw new Error("Error creando producto");
        return res.json();
    },
    update: async (producto) => {
        const res = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!res.ok) throw new Error("Error actualizando producto");
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Error eliminando producto");
        return res.text();
    }
}