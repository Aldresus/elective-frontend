import { RoleEnum } from "./user";

export interface Login {
  email: string;
  password: string;
}

export interface DecodedAccessToken {
  sub: string;
  email: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
  iat: string;
  exp: string;
}

export interface LoginResponse {
  access_token: string;
}
