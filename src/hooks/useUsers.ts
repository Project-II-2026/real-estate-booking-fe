import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import type {PaginationRequest} from "../models/pagination.types.ts";
import {userService} from "../services/userService.ts";

const ADMIN_USERS_KEY = ['admin', 'users'] as const

export const useAdminUsers = (params: PaginationRequest) =>
    useQuery({
        queryKey: [...ADMIN_USERS_KEY, params],
        queryFn: () => userService.getAll(params),
    })

export const useAdminDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => userService.adminDelete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ADMIN_USERS_KEY})
        },
    })
}
