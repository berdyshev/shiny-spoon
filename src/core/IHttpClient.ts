export interface IHttpClient {
  get: (endpoint: string, params: Record<string, unknown>) => Promise<any>;
  post: (endpoint: string, params: Record<string, unknown>) => Promise<any>;
}