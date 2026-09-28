import {
  BadGatewayException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User, UsersResponse } from "../../types/user";
import { Order } from "../../types/order";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  getUsers(): UsersResponse {
    const users = this.usersService.findAll();

    const response: UsersResponse = {
      success: true,
      data: users,
      count: users.length,
    };

    return response;
  }

  // Get user by ID
  @Get(":id")
  getUser(@Param("id") id: string): User {
    const userId = parseInt(id);
    const user = this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException({ error: "User not found" });
    }

    return user;
  }

  // A user's order history, fetched from the order service
  @Get(":id/orders")
  async getUserOrders(@Param("id") id: string): Promise<Order[]> {
    const userId = parseInt(id);
    const user = this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException({ error: "User not found" });
    }

    try {
      return await this.usersService.fetchOrdersForUser(userId);
    } catch (error) {
      throw new BadGatewayException({ error: "Order service unavailable" });
    }
  }
}
