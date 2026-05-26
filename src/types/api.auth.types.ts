export interface LoginCredentials {
  username: string;
  password: string;
  timeoutMs?: number;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string; // Optional for google
  timeoutMs?: number;
}

export interface GoogleLoginCredentials {
  email: string;
  name: string;
  timeoutMs?: number;
}

export interface LoginResponse {
  token?: string;
  access_token?: string;
  jwt?: string;
  user?: any;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  token?: string;
  error?: string;
}

export interface FetchOptions extends RequestInit {
  timeoutMs?: number;
} 
