import React from "react";
import {Link, useNavigate} from "react-router";
import {useAuth} from "../../hooks/useAuth.ts";

interface SideNavProps {
    show: boolean;
    onClose: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({show, onClose}) => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        onClose();
        await logout();
        navigate("/");
    };

    return (
        <>
            {show && (
                <div className="offcanvas-backdrop fade show" onClick={onClose}/>
            )}

            <div
                className={`offcanvas offcanvas-start bg-body${show ? " show" : ""}`}
                tabIndex={-1}
                style={{visibility: show ? "visible" : "hidden"}}
            >
                <div className="offcanvas-header border-bottom border-opacity-10 pb-3">
                    <h5 className="offcanvas-title fw-semibold">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={onClose}
                    />
                </div>

                <div className="offcanvas-body d-flex flex-column gap-2 pt-4">
                    {/* TODO: link to profile page */}
                    <div className="d-flex flex-column align-items-center gap-2 py-3 mb-2">
                        <div
                            className="rounded-circle bg-body-tertiary border-0 shadow-sm d-flex align-items-center justify-content-center"
                            style={{width: 64, height: 64}}
                        >
                            <i className="bi bi-person-fill fs-3 text-body-secondary"/>
                        </div>
                        <span className="fw-semibold text-body">{user?.username}</span>
                    </div>

                    <hr className="border-opacity-25 my-0"/>

                    <Link
                        to="/my-properties"
                        onClick={onClose}
                        className="d-flex align-items-center px-3 py-2 rounded-4 text-body text-decoration-none fw-medium"
                    >
                        <i className="bi bi-house-heart-fill me-3"/>
                        My Properties
                    </Link>

                    <Link
                        to="/add-property"
                        onClick={onClose}
                        className="d-flex align-items-center px-3 py-2 rounded-4 text-body text-decoration-none fw-medium"
                    >
                        <i className="bi bi-plus-circle-fill me-3"/>
                        Add Property
                    </Link>

                    <hr className="border-opacity-25 my-0"/>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-link d-flex align-items-center px-3 py-2 text-danger text-decoration-none fw-medium text-start"
                    >
                        <i className="bi bi-box-arrow-right me-3"/>
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
};
