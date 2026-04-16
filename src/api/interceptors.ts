import { apiClient } from './apiClient'
import {authService} from "../services/authService.ts";

let isRefreshing = false

export const setupInterceptors = (logout: () => Promise<void>) => {

    // Request interceptor
    apiClient.interceptors.request.use(
        config => {
            return config
        },
        error => Promise.reject(error)
    )

    // Response interceptor
    apiClient.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config

            if (error.response?.status === 401 && !isRefreshing && !originalRequest._retry) {
                isRefreshing = true
                originalRequest._retry = true

                try {
                    await authService.refresh()
                    isRefreshing = false
                    return apiClient(originalRequest)
                } catch {
                    isRefreshing = false
                    await logout()
                    return Promise.reject(error)
                }
            }

            return Promise.reject(error)
        }
    )
}