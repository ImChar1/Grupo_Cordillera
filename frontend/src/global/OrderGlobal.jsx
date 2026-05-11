import { createContext, useContext, useState, useEffect } from "react"

const OrderContext = createContext()

export function OrderProvider({ children }) {

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("orders")
        return saved ? JSON.parse(saved) : []
    })

    const [currentOrder, setCurrentOrder] = useState(() => {
        const saved = localStorage.getItem("currentOrder")
        return saved ? JSON.parse(saved) : null
    })
    const [order, setOrder] = useState({
        envioTipo: null,
        pagoMetodo: null
    })



    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders))
    }, [orders])

    useEffect(() => {
        localStorage.setItem("currentOrder", JSON.stringify(currentOrder))
    }, [currentOrder])


    function crearOrden(data) {

        const estadoInicial =
            data.envioTipo === "retiro" ? "reservado" : "confirmado"

        const nuevaOrden = {
        id: Date.now(),
        userEmail: data.userEmail,   
        productos: data.productos,
        total: data.total,
        envioTipo: data.envioTipo,
        pagoMetodo: data.pagoMetodo,
        direccion: data.direccion,
        telefono: data.telefono,
        estado: data.envioTipo === "retiro" ? "reservado" : "confirmado",
        fecha: new Date().toISOString()
    }

        setOrders(prev => [...prev, nuevaOrden])
        setCurrentOrder(nuevaOrden)

        simularFlujo(nuevaOrden)
    }

    function actualizarEstado(id, nuevoEstado) {

        setOrders(prev =>
            prev.map(o =>
                o.id === id ? { ...o, estado: nuevoEstado } : o
            )
        )

        setCurrentOrder(prev =>
            prev && prev.id === id
                ? { ...prev, estado: nuevoEstado }
                : prev
        )
    }


    function simularFlujo(orden) {

        // RETIRO EN SUCURSAL
        if (orden.envioTipo === "retiro") {

            setTimeout(() => {
                actualizarEstado(orden.id, "entregado")
            }, 5000)

            return
        }

        // ENVÍOS NORMALES
        setTimeout(() => {
            actualizarEstado(orden.id, "preparando")
        }, 2000)

        setTimeout(() => {
            actualizarEstado(orden.id, "despachado")
        }, 5000)

        setTimeout(() => {
            actualizarEstado(orden.id, "entregado")
        }, 9000)
    }


    function setEnvio(tipo) {
        setOrder(prev => ({ ...prev, envioTipo: tipo }))
    }

    function setPago(metodo) {
        setOrder(prev => ({ ...prev, pagoMetodo: metodo }))
    }

    function avanzarEstado(estado) {
        if (currentOrder) {
            actualizarEstado(currentOrder.id, estado)
        }
    }

    function limpiarOrdenActual() {
        setCurrentOrder(null)
        localStorage.removeItem("currentOrder")
    }

    function resetOrder() {
        setOrder({
            envioTipo: null,
            pagoMetodo: null
        })
    }

    return (
        <OrderContext.Provider value={{
            orders,
            currentOrder,
            order,
            setEnvio,
            setPago,
            crearOrden,
            actualizarEstado,
            avanzarEstado,
            limpiarOrdenActual,
            resetOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrder() {
    return useContext(OrderContext)
}
