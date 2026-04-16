import {createContext} from 'react'
import type {User} from "../models/user.types.ts";

interface AuthContextType {
    user: User | null
    isLoading: boolean
    fetchUser: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)