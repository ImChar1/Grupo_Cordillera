import "../Css/tracking.css"

export default function Tracking({ estado, envioTipo }) {

  const estadosEnvio = [
    { key: "confirmado", label: "Confirmado" },
    { key: "preparando", label: "Preparando" },
    { key: "despachado", label: "En despacho" },
    { key: "entregado", label: "Entregado" }
  ]

  const estadosRetiro = [
    { key: "confirmado", label: "Confirmado" },
    { key: "reservado", label: "Reservado en sucursal" },
    { key: "entregado", label: "Retirado" }
  ]

  const estados =
    envioTipo === "retiro" ? estadosRetiro : estadosEnvio

  const indiceActual = estados.findIndex(e => e.key === estado)

  return (
    <div className="tracking-container">

      {estados.map((e, index) => {

        const activo = index <= indiceActual

        return (
          <div key={e.key} className="tracking-step">

            <div className={`tracking-circle ${activo ? "active" : ""}`}>
              {index + 1}
            </div>

            <p className={`tracking-label ${activo ? "active" : ""}`}>
              {e.label}
            </p>

            {index < estados.length - 1 && (
              <div className={`tracking-line ${activo ? "active" : ""}`} />
            )}

          </div>
        )
      })}

    </div>
  )
}
