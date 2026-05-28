import {Navigate, Outlet} from "react-router";
import {useAuth} from "../hooks/useAuth.ts";
import {UserRole} from "../models/user.types.ts";

export const AdminRoute = () => {
    const {user, isLoading} = useAuth()

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-moss" role="status"/>
            </div>
        )
    }

    if (!user) return <Navigate to="/login" replace/>
    if (user.role !== UserRole.SuperAdmin) return <Navigate to="/" replace/>

    return <Outlet/>
}
