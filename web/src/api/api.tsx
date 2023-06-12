interface ApiResponse<T> {
  success: boolean;
  value: T;
  error: ApiError;
}

interface ApiError {
  message: string;
  code: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error('API request failed with status: ' + response.status);
    }
    const data: ApiResponse<T> = await response.json();
    if (data.success) {
      return data.value;
    } else {
      throw new Error(
        'API request failed: ' + (data.error?.message || 'Unknown error')
      );
    }
  }

  private handleError(error: Error | unknown): never {
    throw new Error((error as Error).message || 'API request failed');
  }

  private async request<T>(url: string, config?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async get<T>(path: string, config?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    return this.request<T>(url, config);
  }

  public async post<T>(
    path: string,
    data?: object,
    config?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const requestOptions: RequestInit = {
      ...config,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this.request<T>(url, requestOptions);
  }
}

export default ApiClient;
