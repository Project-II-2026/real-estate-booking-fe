import React from "react";
import {Link, useLocation, useNavigate} from "react-router";
import {useAuth} from "../../hooks/useAuth.ts";

interface SideNavProps {
    show: boolean;
    onClose: () => void;
}

interface NavItem {
    to: string;
    label: string;
    icon: string;
}

const NAV_ITEMS: NavItem[] = [
    {to: "/my-properties", label: "My properties", icon: "bi-buildings"},
    {to: "/bookings", label: "My bookings", icon: "bi-calendar-check"},
    {to: "/add-property", label: "List a property", icon: "bi-plus-lg"},
];

export const SideNav: React.FC<SideNavProps> = ({show, onClose}) => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        onClose();
        await logout();
        navigate("/");
    };

    return (
        <>
            {show && (
                <div
                    className="offcanvas-backdrop fade show"
                    onClick={onClose}
                    style={{backgroundColor: "rgba(10, 9, 7, 0.6)", backdropFilter: "blur(8px)"}}
                />
            )}

            <div
                className={`offcanvas offcanvas-start${show ? " show" : ""}`}
                tabIndex={-1}
                style={{visibility: show ? "visible" : "hidden", width: 360}}
            >
                <div className="offcanvas-header hairline-bottom">
                    <span className="eyebrow">Account</span>
                    <button
                        type="button"
                        className="icon-btn"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-lg"/>
                    </button>
                </div>

                <div className="offcanvas-body d-flex flex-column p-0">
                    <div className="px-4 py-4 hairline-bottom">
                        <div className="eyebrow mb-2">Signed in as</div>
                        <div className="fw-medium tracking-snug" style={{fontSize: "1.125rem"}}>
                            {user?.username}
                        </div>
                    </div>

                    <nav className="d-flex flex-column py-2">
                        {NAV_ITEMS.map(item => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={onClose}
                                    className="d-flex align-items-center px-4 py-3 fw-medium position-relative"
                                    style={{
                                        color: isActive ? "var(--bone)" : "var(--bone-muted)",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {isActive && (
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: "20%",
                                                bottom: "20%",
                                                width: 2,
                                                background: "var(--moss)",
                                            }}
                                        />
                                    )}
                                    <i className={`bi ${item.icon} me-3 fs-5`} style={{opacity: 0.85}}/>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto p-4 hairline-top">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-light w-100 fw-medium d-flex align-items-center justify-content-center gap-2"
                        >
                            <i className="bi bi-box-arrow-right"/>
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
