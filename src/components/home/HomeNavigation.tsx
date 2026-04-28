import { Link } from "react-router";

export const HomeNavigation = () => {
  return (
    <div className="bg-body-secondary border-bottom py-2">
      <div className="container d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-md-start small fw-medium">
        <div className="dropdown">
          <button
            className="btn btn-link text-decoration-none text-body dropdown-toggle p-0"
            data-bs-toggle="dropdown"
          >
            For Sale
          </button>
          <ul className="dropdown-menu shadow-sm border-secondary">
            <li>
              <Link
                className="dropdown-item"
                to="/search?type=house&intent=sale"
              >
                Houses
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/search?type=apartment&intent=sale"
              >
                Apartments
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-link text-decoration-none text-body dropdown-toggle p-0"
            data-bs-toggle="dropdown"
          >
            For Rent
          </button>
          <ul className="dropdown-menu shadow-sm border-secondary">
            <li>
              <Link
                className="dropdown-item"
                to="/search?type=house&intent=rent"
              >
                Houses
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/search?type=apartment&intent=rent"
              >
                Apartments
              </Link>
            </li>
          </ul>
        </div>

        <Link
          to="/list-property"
          className="text-decoration-none text-primary ms-md-auto"
        >
          List a property
        </Link>
      </div>
    </div>
  );
};
