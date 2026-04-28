import * as React from "react";

export interface SearchFilters {
  type: string;
  location: string;
  price: string;
  rooms: string;
}

interface Props {
  onSearch: (filters: SearchFilters) => void;
}

export const HomeSearch: React.FC<Props> = ({ onSearch }) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSearch({
      type: formData.get("searchType") as string,
      location: formData.get("searchLocation") as string,
      price: formData.get("searchPrice") as string,
      rooms: formData.get("searchRooms") as string,
    });
  };

  return (
    <section className="bg-body py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-semibold mb-3">
            Discover your new home.
          </h1>
          <p className="fs-5 text-body-secondary">
            Search thousands of houses and apartments.
          </p>
        </div>

        <div className="bg-body-tertiary rounded-5 p-4 p-md-5 mx-auto border-0">
          <form className="row g-3 align-items-end" onSubmit={handleSearch}>
            <div className="col-12 col-md-3">
              <label
                htmlFor="searchType"
                className="form-label small fw-semibold text-body-secondary ms-2 mb-2"
              >
                Property Type
              </label>
              <select
                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                id="searchType"
                name="searchType"
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label
                htmlFor="searchLocation"
                className="form-label small fw-semibold text-body-secondary ms-2 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                id="searchLocation"
                name="searchLocation"
                placeholder="City or Area"
              />
            </div>

            <div className="col-6 col-md-2">
              <label
                htmlFor="searchPrice"
                className="form-label small fw-semibold text-body-secondary ms-2 mb-2"
              >
                Max Price
              </label>
              <select
                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                id="searchPrice"
                name="searchPrice"
              >
                <option value="any">Any</option>
                <option value="500">€500</option>
                <option value="1000">€1,000</option>
                <option value="100000">€100,000+</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label
                htmlFor="searchRooms"
                className="form-label small fw-semibold text-body-secondary ms-2 mb-2"
              >
                Rooms
              </label>
              <select
                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                id="searchRooms"
                name="searchRooms"
              >
                <option value="any">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>

            <div className="col-12 col-md-2">
              <button
                type="submit"
                className="btn btn-dark btn-lg w-100 fw-semibold rounded-pill shadow-sm"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
