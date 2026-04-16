import {useEffect, useState} from "react";
import type {User} from "../models/user.types.ts";
import {userService} from "../services/userService.ts";
import {authService} from "../services/authService.ts";
import { AuthContext } from "./AuthContext.tsx";
import {setupInterceptors} from "../api/interceptors.ts";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const user = await userService.getMe()
            setUser(user)
        } catch {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setupInterceptors(logout)
        fetchUser()
    }, [])

    const logout = async () => {
        await authService.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
