import type {User} from "../models/user.types.ts";
import {api} from "../api/api.ts";

export const userService = {
    getMe: () => api.get<User>('/users/me'),
    getById: (id: number) => api.get<User>(`/users/${id}`),
}