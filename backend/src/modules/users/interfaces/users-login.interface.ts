export interface UserPayload {
  sub: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}
