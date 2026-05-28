import * as React from 'react'

interface Props {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    onChange: (page: number) => void
}

export const AdminPagination: React.FC<Props> = ({
                                                     page,
                                                     totalPages,
                                                     hasNextPage,
                                                     hasPreviousPage,
                                                     onChange,
                                                 }) => {
    if (totalPages <= 1) return null

    return (
        <nav
            className="hairline-top mt-6 pt-4 d-flex justify-content-between align-items-center"
            aria-label="Pagination"
        >
            <button
                className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                onClick={() => onChange(page - 1)}
                disabled={!hasPreviousPage}
                style={{opacity: hasPreviousPage ? 1 : 0.3}}
            >
                <i className="bi bi-arrow-left"/>
                Previous
            </button>

            <div className="d-flex align-items-center gap-2">
                {Array.from({length: totalPages}).map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onChange(i + 1)}
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
                onClick={() => onChange(page + 1)}
                disabled={!hasNextPage}
                style={{opacity: hasNextPage ? 1 : 0.3}}
            >
                Next
                <i className="bi bi-arrow-right"/>
            </button>
        </nav>
    )
}
