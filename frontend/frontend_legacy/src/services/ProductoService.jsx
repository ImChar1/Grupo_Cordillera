const API_URL = 'http://localhost:8080/api/v1/productos'

export const ProductoService = {
    getAll: async () => {
        const res = await fetch(API_URL)
        return res.json()
    },
    getById: async (id) => {
        const res = await fetch(`${API_URL}/${id}`)
        return res.json()
    },
    create: async (producto) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        })
        return res.json()
    },
    update: async (producto) => {
        const res = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        })
        return res.json()
    },
    delete: async (id) => {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        return res.text()
    }
}