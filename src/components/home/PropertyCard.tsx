import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  isNew: boolean;
  images: string[];
}

interface Props {
  property: Property;
}

export const PropertyCard: React.FC<Props> = ({ property }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative bg-body-tertiary">
        <div className="carousel slide">
          <div className="carousel-inner">
            {property.images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === activeIndex ? "active" : ""}`}
              >
                <img
                  src={img}
                  className="d-block w-100 object-fit-cover"
                  height="260"
                  alt={`${property.title} - ${index + 1}`}
                />
              </div>
            ))}
          </div>
          {property.images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={prevSlide}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={nextSlide}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        <div className="position-absolute top-0 start-0 m-3 d-flex gap-2 z-3">
          {property.isNew && (
            <span className="badge text-bg-light rounded-pill px-3 py-2 shadow-sm">
              New
            </span>
          )}
          <span className="badge text-bg-dark bg-opacity-75 rounded-pill px-3 py-2 shadow-sm">
            {property.type}
          </span>
        </div>

        <div className="card-body d-flex flex-column p-4">
          <Link
            to={`/properties/${property.id}`}
            className="text-decoration-none text-body"
          >
            <h5 className="card-title fw-semibold mb-1 text-truncate">
              {property.title}
            </h5>
          </Link>

          <p className="card-text text-body-secondary small mb-4">
            {property.location}
          </p>

          <div className="mt-auto">
            <span className="fs-5 fw-semibold text-body">
              €{property.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
