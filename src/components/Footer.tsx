import * as React from "react";

// 1. We define exactly what props the Footer should expect to receive
interface FooterProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenTerms: () => void;
}

// 2. We tell TypeScript to apply those props to the component
export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-body-tertiary py-4 border-top mt-auto">
      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 text-center text-md-start mt-3 mt-md-0 small text-secondary">
            &copy; {new Date().getFullYear()} RealEstateBooking, Inc. All rights
            reserved.
          </div>
          <div className="col-md-6 text-center text-md-end small">
            <button
              onClick={onOpenAbout}
              className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline me-3"
            >
              About Us
            </button>
            <button
              onClick={onOpenContact}
              className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline me-3"
            >
              Contact Us
            </button>
            <button
              onClick={onOpenTerms}
              className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline"
            >
              Policies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
