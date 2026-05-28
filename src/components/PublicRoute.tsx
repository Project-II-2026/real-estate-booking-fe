
import {Navigate, Outlet} from "react-router";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = () => {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-moss" role="status" />
            </div>
        )
    }

    return user ? <Navigate to="/" replace /> : <Outlet />
}