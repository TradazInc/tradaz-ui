import { authClient } from "./authClient";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = (query?: Record<string, string | number>) => {
    return authClient.$fetch<T>(this.endpoint, { query });
  };

  get = (id: number | string) => {
    return authClient.$fetch<T>(`${this.endpoint}/${id}`);
  };

  post = (body: BodyInit) => {
    return authClient.$fetch<T>(this.endpoint, {
      method: HttpMethod.POST,
      body,
    });
  };

  update = (id: number | string, body: BodyInit) => {
    return authClient.$fetch<T>(`${this.endpoint}/${id}`, {
      method: HttpMethod.PUT,
      body,
    });
  };

  delete = (id: number | string) => {
    return authClient.$fetch<void>(`${this.endpoint}/${id}`, {
      method: HttpMethod.DELETE,
    });
  };
}
