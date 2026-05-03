import {useState} from 'react'
import type {PropertyResponseDto} from '../models/property.types.ts'
import {useMyProperties} from '../hooks/useProperties.ts'
import {PropertyCard} from '../components/home/PropertyCard.tsx'

const PAGE_SIZE = 12

const MyProperties = () => {
    const [page, setPage] = useState(1)

    const {data, isLoading, isError, error} = useMyProperties({page, pageSize: PAGE_SIZE})

    return (
        <div className="w-100 align-self-start">
            <section className="container py-5">
                <div className="mb-4">
                    <h3 className="fw-semibold mb-1">My Properties</h3>
                    <p className="text-body-secondary small mb-0">Properties you have listed.</p>
                </div>

                {isLoading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-dark border-2" role="status">
                            <span className="visually-hidden">Loading properties...</span>
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="alert alert-danger py-2 small">
                        {error?.message ?? 'Something went wrong.'}
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                            {data && data.items.length > 0 ? (
                                data.items.map((property: PropertyResponseDto) => (
                                    <PropertyCard key={property.id} property={property}/>
                                ))
                            ) : (
                                <div className="col-12 text-center text-body-secondary py-5">
                                    You haven't listed any properties yet.
                                </div>
                            )}
                        </div>

                        {data && data.totalPages > 1 && (
                            <nav className="mt-5 d-flex justify-content-center" aria-label="Properties pagination">
                                <ul className="pagination gap-2 mb-0">
                                    <li className={`page-item ${!data.hasPreviousPage ? 'disabled' : ''}`}>
                                        <button
                                            className="btn btn-light rounded-pill btn-sm fw-medium shadow-sm px-3"
                                            onClick={() => setPage(p => p - 1)}
                                            disabled={!data.hasPreviousPage}
                                        >
                                            ← Previous
                                        </button>
                                    </li>

                                    <li className="page-item disabled">
                                        <span className="btn btn-sm px-3 fw-medium text-body-secondary">
                                            {page} / {data.totalPages}
                                        </span>
                                    </li>

                                    <li className={`page-item ${!data.hasNextPage ? 'disabled' : ''}`}>
                                        <button
                                            className="btn btn-light rounded-pill btn-sm fw-medium shadow-sm px-3"
                                            onClick={() => setPage(p => p + 1)}
                                            disabled={!data.hasNextPage}
                                        >
                                            Next →
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </section>
        </div>
    )
}

export default MyProperties
