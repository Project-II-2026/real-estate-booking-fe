import React, {useState} from 'react'
import {PropertyType} from '../../models/property.types.ts'

export interface SearchFilters {
    location: string
    type: string
    minPrice: string
    maxPrice: string
    minBedrooms: string
    maxBedrooms: string
}

const EMPTY_FILTERS: SearchFilters = {
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
}

interface HomeSearchProps {
    onSearch: (filters: SearchFilters) => void
}

export const HomeSearch: React.FC<HomeSearchProps> = ({onSearch}) => {
    const [form, setForm] = useState<SearchFilters>(EMPTY_FILTERS)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {id, value} = e.target
        setForm(prev => ({...prev, [id]: value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSearch(form)
    }

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
                    <form className="row g-3 align-items-end" onSubmit={handleSubmit}>

                        {/* Row 1: type, location, price range */}
                        <div className="col-12 col-md-3">
                            <label htmlFor="type"
                                   className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                                Property Type
                            </label>
                            <select
                                id="type"
                                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <option value="">All Types</option>
                                <option value={PropertyType.House}>House</option>
                                <option value={PropertyType.Apartment}>Apartment</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-3">
                            <label htmlFor="location"
                                   className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                                placeholder="City or Area"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-6 col-md-3">
                            <label htmlFor="minPrice"
                                   className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                                Min Price
                            </label>
                            <select
                                id="minPrice"
                                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                                value={form.minPrice}
                                onChange={handleChange}
                            >
                                <option value="">Any</option>
                                <option value="50000">€50,000</option>
                                <option value="100000">€100,000</option>
                                <option value="250000">€250,000</option>
                                <option value="500000">€500,000</option>
                                <option value="1000000">€1,000,000</option>
                            </select>
                        </div>

                        <div className="col-6 col-md-3">
                            <label htmlFor="maxPrice"
                                   className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                                Max Price
                            </label>
                            <select
                                id="maxPrice"
                                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                                value={form.maxPrice}
                                onChange={handleChange}
                            >
                                <option value="">Any</option>
                                <option value="50000">€50,000</option>
                                <option value="100000">€100,000</option>
                                <option value="250000">€250,000</option>
                                <option value="500000">€500,000</option>
                                <option value="1000000">€1,000,000</option>
                            </select>
                        </div>

                        {/* Row 2: bedrooms range + search */}
                        <div className="col-6 col-md-3">
                            <label htmlFor="minBedrooms"
                                   className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                                Min Bedrooms
                            </label>
                            <select
                                id="minBedrooms"
                                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                                value={form.minBedrooms}
                                onChange={handleChange}
                            >
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                        </div>

                        <div className="col-6 col-md-3">
                            <label htmlFor="maxBedrooms"
                                   className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                                Max Bedrooms
                            </label>
                            <select
                                id="maxBedrooms"
                                className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                                value={form.maxBedrooms}
                                onChange={handleChange}
                            >
                                <option value="">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5+</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-2 ms-auto">
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
    )
}
