import { Link } from "react-router";

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom py-3">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    RealEstateBooking
                </Link>
            </div>
        </nav>
    );
};