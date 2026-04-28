import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.ts";

export const Header = () => {
  const { user, logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body py-3 sticky-top border-bottom border-opacity-10">
        <div className="container d-flex align-items-center">
          <button
            className="btn btn-link text-body p-0 me-3 border-0"
            onClick={() => setShowSidebar(true)}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>

          <Link className="navbar-brand fw-semibold fs-5 me-auto" to="/">
            RealEstateBooking
          </Link>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="fw-medium text-body-secondary small d-none d-sm-inline">
                  Hello, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-dark btn-sm fw-medium rounded-pill px-4 py-2"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
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

      {showSidebar && (
        <div
          className="offcanvas-backdrop fade show bg-dark bg-opacity-50"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      <div
        className={`offcanvas offcanvas-start bg-body text-body border-0 shadow ${showSidebar ? "show" : ""}`}
        tabIndex={-1}
        style={{ visibility: showSidebar ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header border-bottom border-opacity-10 py-4 px-4">
          <h5 className="offcanvas-title fw-semibold">Menu</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSidebar(false)}
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body p-4 d-flex flex-column gap-4">
          <div>
            <h6 className="text-body-secondary fw-semibold small text-uppercase mb-3">
              For Sale
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <Link
                  to="/search?type=house&intent=sale"
                  className="text-decoration-none text-body fs-5 fw-medium d-block w-100"
                  onClick={() => setShowSidebar(false)}
                >
                  Houses
                </Link>
              </li>
              <li>
                <Link
                  to="/search?type=apartment&intent=sale"
                  className="text-decoration-none text-body fs-5 fw-medium d-block w-100"
                  onClick={() => setShowSidebar(false)}
                >
                  Apartments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-body-secondary fw-semibold small text-uppercase mb-3">
              For Rent
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <Link
                  to="/search?type=house&intent=rent"
                  className="text-decoration-none text-body fs-5 fw-medium d-block w-100"
                  onClick={() => setShowSidebar(false)}
                >
                  Houses
                </Link>
              </li>
              <li>
                <Link
                  to="/search?type=apartment&intent=rent"
                  className="text-decoration-none text-body fs-5 fw-medium d-block w-100"
                  onClick={() => setShowSidebar(false)}
                >
                  Apartments
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-auto pt-4 border-top border-opacity-10">
            <Link
              to="/list-property"
              className="btn btn-primary w-100 fw-medium rounded-pill py-3"
              onClick={() => setShowSidebar(false)}
            >
              List a property
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
