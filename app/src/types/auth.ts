export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;

  user_id: number;
  email: string;

  detail: string;

  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: string;

  type: number;
}
