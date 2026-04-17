import { apiClient } from './apiClient'

export const api = {
    get: <T>(path: string) =>
        apiClient.get<T>(path).then(response => response.data),

    post: <T>(path: string, body?: unknown) =>
        apiClient.post<T>(path, body).then(response => response.data),

    put: <T>(path: string, body?: unknown) =>
        apiClient.put<T>(path, body).then(response => response.data),

    delete: <T>(path: string) =>
        apiClient.delete<T>(path).then(response => response.data),
}