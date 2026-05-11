import { useState } from "react"
import { useCart } from "../global/CarritoContext"
import { useUser } from "../global/UsuarioGlobal"
import { useOrder } from "../global/OrderGlobal"
import { useNavigate } from "react-router-dom"
import "../Css/Pago.css"

export default function Pago() {

    const { carrito, total, clearCarrito } = useCart()
    const { user } = useUser()
    const { order, setEnvio, setPago, crearOrden } = useOrder()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const MAX_EFECTIVO = 30000

    const validarPago = () => {

        if (carrito.length === 0) {
            return "El carrito está vacío"
        }

        if (!order.envioTipo) {
            return "Seleccione un método de envío"
        }

        if (!order.pagoMetodo) {
            return "Seleccione un método de pago"
        }

        if (!user.direccion || !user.telefono) {
            return "Complete su perfil con dirección y teléfono"
        }

        if (order.pagoMetodo === "efectivo" && total > MAX_EFECTIVO) {
            return "El pago en efectivo no puede exceder $30.000"
        }

        return null
    }

    const handleConfirmarPago = () => {

        const errorValidacion = validarPago()

        if (errorValidacion) {
            setError(errorValidacion)
            return
        }

        // AQUÍ SE CREA LA ORDEN
        crearOrden({
            productos: carrito,
            total,
            envioTipo: order.envioTipo,
            pagoMetodo: order.pagoMetodo,
            direccion: user.direccion,
            telefono: user.telefono,
            userEmail: user.email   // asociación al usuario
        })

        clearCarrito()
        navigate("/confirmacion")
    }

    return (
        <div className="pago-container">

            <h2><i className="bi bi-wallet2"></i> Pago</h2>

            <div className="pago-card">
                <h4><i className="bi bi-truck"></i> Tipo de envío</h4>

                <div className="pago-opciones">
                    <button
                        onClick={() => setPago("credito")}
                        className={`opcion-btn ${order.pagoMetodo === "credito" ? "active" : ""}`}
                    >
                        💳 Crédito
                    </button>

                    <button
                        onClick={() => setPago("debito")}
                        className={`opcion-btn ${order.pagoMetodo === "debito" ? "active" : ""}`}
                    >
                        💳 Débito
                    </button>

                    <button
                        onClick={() => setPago("efectivo")}
                        className={`opcion-btn ${order.pagoMetodo === "efectivo" ? "active" : ""}`}
                    >
                        💵 Efectivo
                    </button>
                </div>

            </div>

            <div className="pago-card">
                <h4><i className="bi bi-credit-card"></i> Método de pago</h4>

                <div className="pago-opciones">
                    <button
                        onClick={() => setEnvio("express")}
                        className={`opcion-btn ${order.envioTipo === "express" ? "active" : ""}`}
                    >
                        🚀 Envío Express
                    </button>

                    <button
                        onClick={() => setEnvio("estandar")}
                        className={`opcion-btn ${order.envioTipo === "estandar" ? "active" : ""}`}
                    >
                        🚛 Envío Estándar
                    </button>

                    <button
                        onClick={() => setEnvio("retiro")}
                        className={`opcion-btn ${order.envioTipo === "retiro" ? "active" : ""}`}
                    >
                        🏬 Retiro en sucursal
                    </button>
                </div>

            </div>

            <div className="pago-resumen">
                <p><b>Total:</b> ${total}</p>
                <p><b>Dirección:</b> {user.direccion}</p>
                <p><b>Teléfono:</b> {user.telefono}</p>
            </div>

            <button
                onClick={handleConfirmarPago}
                className="btn-confirmar"
                disabled={!order.envioTipo || !order.pagoMetodo}
            >
                Confirmar pago
            </button>


        </div>

    )
}
