export interface RegisterModel {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface TokenModel {
  access_token: string;
  refresh_token: string;
}

export interface UserModel {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  user_role: string;
  is_admin: boolean;
}

export interface UserAuthResponseModel {
  token: TokenModel;
  user: UserModel;
}

export interface LogInRequestModel {
  email: string;
  password: string;
}

export interface UserUpdateRequestModel {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  user_role?: string;
  is_admin?: boolean;
  can_approve_applications?: boolean;
}
