export interface CustomError {
  statusCode?: number;
  message: string | string[];
}

export interface ErrorResponse {
  statusCode?: number;
  message?: string | string[];
  data?: any;
  trace?: any[];
}

export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  message: string;
  data: T;
  error?: unknown;
}
