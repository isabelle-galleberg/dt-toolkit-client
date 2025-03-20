export interface User {
  _id: string;
  username: string;
  password: string;
  page: string;
}

export interface UserResponse {
  token: string;
  user: User;
}
