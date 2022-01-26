import { FetchHttpClient } from "./ApiClient";
import { MetricsApiService } from "./MetricsApiService";

const apiClient = new FetchHttpClient(process.env.REACT_APP_API_ENDPOINT as string);
export const metricsService = new MetricsApiService(apiClient);