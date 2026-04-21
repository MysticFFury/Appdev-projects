export interface AuthState {
  user: any;
  isLoading: boolean;
  error: string | null;
}

export interface AuthAction {
  type: string;
  payload?: any;
  error?: string;
}
