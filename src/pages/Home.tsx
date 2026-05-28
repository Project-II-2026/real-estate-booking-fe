import {useState} from 'react'
import {HomeSearch, type SearchFilters} from '../components/home/HomeSearch.tsx'
import {useProperties} from '../hooks/useProperties.ts'
import {PropertyCard} from '../components/home/PropertyCard.tsx'
import type {PropertySearchParams} from '../models/property.types.ts'

const PAGE_SIZE = 12

const buildParams = (page: number, filters: SearchFilters | null): PropertySearchParams => {
    const params: PropertySearchParams = {page, pageSize: PAGE_SIZE}
    if (!filters) return params
    if (filters.location) params.location = filters.location
    if (filters.type) params.type = filters.type as PropertySearchParams['type']
    if (filters.minPrice) params.minPrice = Number(filters.minPrice)
    if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice)
    if (filters.minBedrooms) params.minBedrooms = Number(filters.minBedrooms)
    if (filters.maxBedrooms) params.maxBedrooms = Number(filters.maxBedrooms)
    return params
}

const Home = () => {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState<SearchFilters | null>(null)

    const {data, isLoading, isError, error} = useProperties(buildParams(page, filters))

    const handleSearch = (newFilters: SearchFilters) => {
        setFilters(newFilters)
        setPage(1)
    }

    const handleClearFilters = () => {
        setFilters(null)
        setPage(1)
    }

    const hasActiveFilters = !!(filters && (
        filters.location || filters.type || filters.minPrice || filters.maxPrice || filters.minBedrooms || filters.maxBedrooms
    ))

    const totalLabel = data
        ? `${data.totalCount} home${data.totalCount === 1 ? '' : 's'}`
        : ''

    return (
        <div className="w-100">
            <HomeSearch onSearch={handleSearch}/>

            <section className="container pb-7">
                <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
                    <div>
                        <div className="eyebrow eyebrow-rule mb-3">
                            N°02 / Latest listings
                        </div>
                        <h2 className="fw-medium tracking-tight mb-0" style={{fontSize: "1.75rem"}}>
                            Featured homes
                        </h2>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {data && (
                            <span className="text-bone-muted small">{totalLabel}</span>
                        )}
                        {hasActiveFilters && (
                            <button
                                className="btn btn-light btn-sm fw-medium"
                                onClick={handleClearFilters}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-7">
                        <div className="spinner-border text-bone-muted" role="status">
                            <span className="visually-hidden">Loading properties…</span>
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="alert alert-danger">
                        {error?.message ?? 'Something went wrong.'}
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
                            {data && data.items.length > 0 ? (
                                data.items.map(property => (
                                    <PropertyCard key={property.id} property={property}/>
                                ))
                            ) : (
                                <div className="col-12 text-center text-bone-muted py-7">
                                    No properties match your search.
                                </div>
                            )}
                        </div>

                        {data && data.totalPages > 1 && (
                            <nav className="hairline-top mt-7 pt-4 d-flex justify-content-between align-items-center" aria-label="Properties pagination">
                                <button
                                    className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                                    onClick={() => setPage(p => p - 1)}
                                    disabled={!data.hasPreviousPage}
                                    style={{opacity: data.hasPreviousPage ? 1 : 0.3}}
                                >
                                    <i className="bi bi-arrow-left"/>
                                    Previous
                                </button>

                                <div className="d-flex align-items-center gap-2">
                                    {Array.from({length: data.totalPages}).map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setPage(i + 1)}
                                            aria-label={`Page ${i + 1}`}
                                            className="btn p-0"
                                            style={{minWidth: 24, height: 24}}
                                        >
                                            <span className={`page-dot${page === i + 1 ? ' active' : ''}`}/>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!data.hasNextPage}
                                    style={{opacity: data.hasNextPage ? 1 : 0.3}}
                                >
                                    Next
                                    <i className="bi bi-arrow-right"/>
                                </button>
                            </nav>
                        )}
                    </>
                )}
            </section>
        </div>
    )
}

export default Home
