import {useState} from 'react'
import {Link} from 'react-router'
import type {PropertyResponseDto} from '../models/property.types.ts'
import {useMyProperties} from '../hooks/useProperties.ts'
import {PropertyCard} from '../components/home/PropertyCard.tsx'

const PAGE_SIZE = 12

const MyProperties = () => {
    const [page, setPage] = useState(1)

    const {data, isLoading, isError, error} = useMyProperties({page, pageSize: PAGE_SIZE})

    return (
        <div className="w-100">
            <section className="container py-7">
                <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
                    <div>
                        <div className="eyebrow eyebrow-rule mb-3">Your account</div>
                        <h1 className="fw-semibold tracking-tight mb-0" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                            My properties.
                        </h1>
                    </div>
                    <Link to="/add-property" className="btn btn-primary fw-medium d-inline-flex align-items-center gap-2">
                        <i className="bi bi-plus-lg"/>
                        List a property
                    </Link>
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
                                data.items.map((property: PropertyResponseDto) => (
                                    <PropertyCard key={property.id} property={property}/>
                                ))
                            ) : (
                                <div className="col-12 text-center text-bone-muted py-7">
                                    You haven't listed any properties yet.
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
                                <span className="small text-bone-muted">
                                    Page {page} of {data.totalPages}
                                </span>
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

export default MyProperties
