export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string|null;
}

export interface UserResponse {
  data: User;
}
export interface UsersResponse {
  totalPages: number;
  data: User[];
}
