import { Pedido } from '../models/Pedido';

export const OrderService = {
  saveOrder: async (order: any) => {
    console.log("Guardando pedido...", order);
    return { success: true, orderId: "ORD-" + Math.random().toString(36).substr(2, 9) };
  },
  getHistory: (): Pedido[] => {
    return []; // Por ahora vacío
  }
};