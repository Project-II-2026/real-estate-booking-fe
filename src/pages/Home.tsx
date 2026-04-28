import { useState, useEffect } from "react";
import {
  HomeSearch,
  type SearchFilters,
} from "../components/home/HomeSearch.tsx";
import {
  PropertyCard,
  type Property,
} from "../components/home/PropertyCard.tsx";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters | null>(null);

  useEffect(() => {
    const fetchProperties = () => {
      setTimeout(() => {
        setProperties([
          {
            id: 1,
            title: "Modern Minimalist House",
            location: "Cluj-Napoca, Zorilor",
            price: "250,000",
            type: "House",
            isNew: true,
            images: [
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
            ],
          },
          {
            id: 2,
            title: "Luxury City Apartment",
            location: "Cluj-Napoca, Mărăști",
            price: "850 / month",
            type: "Apartment",
            isNew: false,
            images: [
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
            ],
          },
          {
            id: 3,
            title: "Cozy Family Home",
            location: "Florești, Cluj",
            price: "180,000",
            type: "House",
            isNew: true,
            images: [
              "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
            ],
          },
        ]);
        setIsLoading(false);
      }, 800);
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    if (!filters) return true;
    let isMatch = true;

    if (
      filters.type !== "all" &&
      property.type.toLowerCase() !== filters.type.toLowerCase()
    ) {
      isMatch = false;
    }
    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      isMatch = false;
    }
    return isMatch;
  });

  return (
    <div className="w-100 align-self-start">
      <HomeSearch onSearch={setFilters} />

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-semibold mb-0">Latest Listings</h3>

          {filters && (
            <button
              className="btn btn-light rounded-pill btn-sm fw-medium shadow-sm px-3"
              onClick={() => setFilters(null)}
            >
              Clear Filters
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-dark border-2" role="status">
              <span className="visually-hidden">Loading properties...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-12 text-center text-body-secondary py-5">
                No properties match your search.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
