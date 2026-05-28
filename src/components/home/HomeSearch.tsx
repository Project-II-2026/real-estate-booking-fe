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
        <section className="py-7">
            <div className="container">
                <div className="mb-6">
                    <div className="eyebrow eyebrow-rule mb-4">
                        N°01 / Curated homes in Cluj
                    </div>
                    <h1 className="display-hero mb-4" style={{maxWidth: "16ch"}}>
                        Architecture<br/>you can live in.
                    </h1>
                    <p className="text-bone-muted" style={{fontSize: "1.0625rem", lineHeight: 1.55, maxWidth: "44ch"}}>
                        Considered homes across Cluj-Napoca and Transylvania,
                        updated weekly.
                    </p>
                </div>

                <div className="surface p-4 p-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3 align-items-end">
                            <div className="col-12 col-md-3">
                                <label htmlFor="location" className="form-label">
                                    Where
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    className="form-control"
                                    placeholder="Cluj-Napoca, Mănăștur…"
                                    value={form.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-6 col-md-2">
                                <label htmlFor="type" className="form-label">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    className="form-select"
                                    value={form.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Any</option>
                                    <option value={PropertyType.House}>House</option>
                                    <option value={PropertyType.Apartment}>Apartment</option>
                                </select>
                            </div>

                            <div className="col-6 col-md-2">
                                <label htmlFor="minPrice" className="form-label">
                                    Min price
                                </label>
                                <select
                                    id="minPrice"
                                    className="form-select"
                                    value={form.minPrice}
                                    onChange={handleChange}
                                >
                                    <option value="">Any</option>
                                    <option value="50000">€50k</option>
                                    <option value="100000">€100k</option>
                                    <option value="250000">€250k</option>
                                    <option value="500000">€500k</option>
                                    <option value="1000000">€1M</option>
                                </select>
                            </div>

                            <div className="col-6 col-md-2">
                                <label htmlFor="maxPrice" className="form-label">
                                    Max price
                                </label>
                                <select
                                    id="maxPrice"
                                    className="form-select"
                                    value={form.maxPrice}
                                    onChange={handleChange}
                                >
                                    <option value="">Any</option>
                                    <option value="100000">€100k</option>
                                    <option value="250000">€250k</option>
                                    <option value="500000">€500k</option>
                                    <option value="1000000">€1M</option>
                                    <option value="2000000">€2M</option>
                                </select>
                            </div>

                            <div className="col-6 col-md-1">
                                <label htmlFor="minBedrooms" className="form-label">
                                    Beds
                                </label>
                                <select
                                    id="minBedrooms"
                                    className="form-select"
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

                            <div className="col-12 col-md-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-medium d-flex align-items-center justify-content-center gap-2"
                                    style={{height: "calc(0.75rem * 2 + 1.4em + 2px)"}}
                                >
                                    Search
                                    <i className="bi bi-arrow-right"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
