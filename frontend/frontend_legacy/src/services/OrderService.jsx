export const OrderService = {
  saveOrder: async (order) => {
    console.log("Guardando pedido...", order);
    return { success: true, orderId: "ORD-" + Math.random().toString(36).substr(2, 9) };
  },
  getHistory: () => {
    return []; // Por ahora vacío
  }
};