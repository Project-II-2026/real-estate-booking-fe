import {apiClient} from './apiClient'

export const api = {
    get: <T>(path: string, params?: Record<string, unknown>) =>
        apiClient.get<T>(path, {params}).then(response => response.data),

    post: <T>(path: string, body?: unknown) =>
        apiClient.post<T>(path, body).then(response => response.data),

    put: <T>(path: string, body?: unknown) =>
        apiClient.put<T>(path, body).then(response => response.data),

    patch: <T>(path: string, body?: unknown) =>
        apiClient.patch<T>(path, body).then(response => response.data),

    delete: <T>(path: string) =>
        apiClient.delete<T>(path).then(response => response.data),
}