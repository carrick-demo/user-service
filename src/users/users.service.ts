import { Injectable } from "@nestjs/common";
import axios from "axios";
import { User } from "../../types/user";
import { Order } from "../../types/order";

const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:3002";

// In-memory user storage
const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 30 },
  { id: 2, name: "Bob Smith", age: 25 },
];

@Injectable()
export class UsersService {
  findAll(): User[] {
    return users;
  }

  findById(userId: number): User | undefined {
    return users.find((u) => u.id === userId);
  }

  // A user's order history, fetched from the order service
  async fetchOrdersForUser(userId: number): Promise<Order[]> {
    const ordersResponse = await axios.get<Order[]>(
      `${ORDER_SERVICE_URL}/api/orders`,
    );

    return ordersResponse.data.filter((o) => o.userId === userId);
  }
}
