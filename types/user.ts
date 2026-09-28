export interface User {
  id: number;
  name: string;
  email?: string;
  age: number;
}

export interface UserResponse {
  success?: boolean;
  data?: User;
  error?: string;
}

export interface UsersResponse {
  success?: boolean;
  data?: User[];
  count?: number;
  error?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}
