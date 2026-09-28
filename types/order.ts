// Order shape as served by order-service's GET /api/orders
export interface Order {
  id: number;
  userId: number;
  product: string;
  amount: number;
}
