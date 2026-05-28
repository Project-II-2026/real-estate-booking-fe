import type {User} from "../models/user.types.ts";
import type {PaginationRequest, PaginationResponse} from "../models/pagination.types.ts";
import {api} from "../api/api.ts";

export const userService = {
    getMe: () => api.get<User>('/users/me'),
    getById: (id: number) => api.get<User>(`/users/${id}`),

    getAll: (params: PaginationRequest) =>
        api.get<PaginationResponse<User>>('/admin/users', params as unknown as Record<string, unknown>),

    adminDelete: (id: number) =>
        api.delete<void>(`/admin/users/${id}`),
}
