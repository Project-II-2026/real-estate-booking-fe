import axios, {type AxiosError} from 'axios'
import {apiClient} from './apiClient'

type ApiErrorBody = { statusCode?: number; message?: string }

const unwrap = (err: unknown): never => {
    if (axios.isAxiosError(err)) {
        const body = (err as AxiosError<ApiErrorBody>).response?.data
        throw new Error(body?.message ?? err.message)
    }
    throw err
}

export const api = {
    get: <T>(path: string, params?: Record<string, unknown>) =>
        apiClient.get<T>(path, {params}).then(response => response.data).catch(unwrap),

    post: <T>(path: string, body?: unknown) =>
        apiClient.post<T>(path, body).then(response => response.data).catch(unwrap),

    put: <T>(path: string, body?: unknown) =>
        apiClient.put<T>(path, body).then(response => response.data).catch(unwrap),

    patch: <T>(path: string, body?: unknown) =>
        apiClient.patch<T>(path, body).then(response => response.data).catch(unwrap),

    delete: <T>(path: string) =>
        apiClient.delete<T>(path).then(response => response.data).catch(unwrap),
}
