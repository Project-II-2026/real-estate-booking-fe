import React from "react";
import {Link} from "react-router";
import {useAuth} from "../../hooks/useAuth.ts";

interface HeaderProps {
    onOpenSideNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({onOpenSideNav}) => {
    const {user} = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body py-3 sticky-top border-bottom border-opacity-10">
            <div className="container d-flex align-items-center">
                {user && (
                    <button
                        type="button"
                        onClick={onOpenSideNav}
                        className="btn btn-link p-0 text-body border-0 me-3"
                        aria-label="Open menu"
                    >
                        <i className="bi bi-list fs-4"/>
                    </button>
                )}

                <Link className="navbar-brand fw-semibold fs-5 me-auto" to="/">
                    RealEstateBooking
                </Link>

                <div className="d-flex align-items-center">
                    {user ? (
                        <div className="d-flex align-items-center">
                            <span className="fw-medium text-body-secondary small d-none d-sm-inline">
                                Hello, {user.username}
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-3">
                            {/*TODO: Maybe we will allow the user on home page i */}
                            <Link
                                to="/login"
                                className="text-decoration-none text-body fw-medium small"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-dark btn-sm fw-medium rounded-pill px-4 py-2"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
