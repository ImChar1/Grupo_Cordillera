import { useParams } from "react-router-dom"
import { useOrder } from "./global/OrderGlobal"
import Boleta from "./components/Boleta"
import Tracking from "@/components/organisms/Tracking"

export default function VerBoleta() {

  const { id } = useParams()
  const { orders } = useOrder()

  const order = orders.find(o => o.id === Number(id))

  if (!order) {
    return <p>Pedido no encontrado</p>
  }

  return (
    <div className="boleta-page">
      <Tracking estado={order.estado} />
      <Boleta order={order} />
    </div>
  )
}
