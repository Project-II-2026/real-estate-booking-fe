import {useMutation} from '@tanstack/react-query'
import {useNavigate} from "react-router";
import type {LoginRequest, RegisterRequest} from "../models/auth.types.ts";
import {authService} from "../services/authService.ts";
import {useAuth} from "./useAuth.ts";

export const useLogin = () => {
    const navigate = useNavigate()
    const {fetchUser} = useAuth();

    return useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: async () => {
            await fetchUser()
            navigate('/')
        }
    })
}

export const useRegister = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data),
        onSuccess: (data) => {
            console.log(data)
            navigate('/login')
        },
    })
}