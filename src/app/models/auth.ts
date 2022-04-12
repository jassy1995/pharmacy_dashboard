export interface AuthResponse {
  message?: string;
  merchant?: number;
  partnership?: number;
  status: boolean;
  data: {
    token: string;
  };
  uses_global: 0 | 1;
}
