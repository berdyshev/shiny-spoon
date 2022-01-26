import { IHttpClient } from "./IHttpClient";

export class FetchHttpClient implements IHttpClient {
  constructor(private baseUrl: string) {
  }

  async get(endpoint: string, params: Record<string, unknown>) {
    return this.request(endpoint, { ...params, method: 'GET' });
  };

  async post(endpoint: string, params: Record<string, unknown>) {
    return this.request(endpoint, { ...params, method: 'POST' });
  };

  private async request(endpoint: string, params: Record<string, unknown>) {
    const requestUrl = new URL(endpoint, this.baseUrl);
    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: {},
      ...params,
    };
    if (typeof params.body === 'object') {
      options.body = JSON.stringify(params.body);
      (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
    }
    const response = await fetch(requestUrl.toString(), options);
    return await response.json();
  }
}