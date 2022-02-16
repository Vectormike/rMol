export interface CreateUserAccountInput {
  email: string;
  full_name: string;
  password: string;
}

export interface AuthJWTInput {
  id: number;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ChangePasswordInput {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordInput {
  resetToken: string;
  password: string;
  confirmPassword: string;
}
