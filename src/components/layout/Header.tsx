import React from "react";
import {Link} from "react-router";
import {useAuth} from "../../hooks/useAuth.ts";

interface HeaderProps {
    onOpenSideNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({onOpenSideNav}) => {
    const {user} = useAuth();

    return (
        <nav className="navbar navbar-expand-lg nav-blur py-3 sticky-top">
            <div className="container d-flex align-items-center">
                <Link
                    to="/"
                    className="navbar-brand fw-semibold tracking-tight me-auto d-flex align-items-baseline"
                    style={{fontSize: "1.125rem"}}
                >
                    Estatly<span className="moss-dot" aria-hidden="true"/>
                </Link>

                {user ? (
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-bone-muted small d-none d-sm-inline">
                            {user.username}
                        </span>
                        <button
                            type="button"
                            onClick={onOpenSideNav}
                            className="icon-btn"
                            aria-label="Open menu"
                        >
                            <i className="bi bi-list fs-5"/>
                        </button>
                    </div>
                ) : (
                    <div className="d-flex align-items-center gap-4">
                        <Link to="/login" className="link-muted small fw-medium">
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-primary btn-sm fw-medium px-3"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
