import type {LoginRequest, RegisterRequest, RegisterResponse} from "../models/auth.types.ts";
import {api} from "../api/api.ts";


export const authService = {
    login: (data: LoginRequest) =>
        api.post<void>('/auth/login', data),

    register: (data: RegisterRequest) =>
        api.post<RegisterResponse>('/users/register', data),

    refresh: () =>
        api.post<void>('/auth/refresh', undefined),

    logout: () =>
        api.post<void>('/auth/logout', undefined),
}