import {useState} from 'react'
import type {PropertyResponseDto, PropertySearchParams} from '../../models/property.types.ts'
import {useDeleteProperty, useProperties} from '../../hooks/useProperties.ts'
import {AdminPagination} from './AdminPagination.tsx'
import {AdminPropertyEditModal} from './AdminPropertyEditModal.tsx'
import {ConfirmDeleteModal} from './ConfirmDeleteModal.tsx'

const PAGE_SIZE = 12

const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}).format(price)

export const AdminPropertiesTab = () => {
    const [page, setPage] = useState(1)
    const [editing, setEditing] = useState<PropertyResponseDto | null>(null)
    const [deleting, setDeleting] = useState<PropertyResponseDto | null>(null)

    const params: PropertySearchParams = {page, pageSize: PAGE_SIZE}
    const {data, isLoading, isError, error} = useProperties(params)

    const {
        mutate: deleteProperty,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError,
        reset: resetDelete,
    } = useDeleteProperty()

    const handleConfirmDelete = () => {
        if (!deleting) return
        deleteProperty(deleting.id, {onSuccess: () => setDeleting(null)})
    }

    const handleCloseDelete = () => {
        if (!isDeleting) {
            setDeleting(null)
            resetDelete()
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
                <div>
                    <div className="eyebrow mb-2">All properties</div>
                    <h2 className="fw-medium tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                        Listings
                    </h2>
                </div>
                {data && (
                    <span className="text-bone-muted small">
                        {data.totalCount} total
                    </span>
                )}
            </div>

            {isLoading && (
                <div className="text-center py-7">
                    <div className="spinner-border text-bone-muted" role="status">
                        <span className="visually-hidden">Loading…</span>
                    </div>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger">
                    {error?.message ?? 'Failed to load properties.'}
                </div>
            )}

            {!isLoading && !isError && data && (
                <>
                    <div className="surface">
                        <div className="d-none d-md-grid px-4 py-3 hairline-bottom"
                             style={{gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1.5fr 1fr"}}>
                            <div className="eyebrow">Title</div>
                            <div className="eyebrow">Location</div>
                            <div className="eyebrow">Type</div>
                            <div className="eyebrow">Price</div>
                            <div className="eyebrow">Owner</div>
                            <div className="eyebrow text-end">Actions</div>
                        </div>

                        {data.items.length === 0 ? (
                            <div className="text-center text-bone-muted py-6">
                                No properties found.
                            </div>
                        ) : (
                            data.items.map((p, idx) => (
                                <div
                                    key={p.id}
                                    className={`px-4 py-3 d-md-grid d-flex flex-column gap-2${idx < data.items.length - 1 ? ' hairline-bottom' : ''}`}
                                    style={{gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1.5fr 1fr"}}
                                >
                                    <div className="text-truncate fw-medium" style={{color: "var(--bone)"}}>
                                        {p.title}
                                    </div>
                                    <div className="text-bone-muted small text-truncate">
                                        {p.location}
                                    </div>
                                    <div className="text-bone-muted small">
                                        {p.type}
                                    </div>
                                    <div className="fw-medium" style={{color: "var(--bone)"}}>
                                        {formatPrice(p.price)}
                                    </div>
                                    <div className="text-bone-muted small text-truncate">
                                        {p.ownerUsername}
                                    </div>
                                    <div className="d-flex gap-2 justify-content-md-end">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-sm fw-medium"
                                            onClick={() => setEditing(p)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm fw-medium"
                                            style={{
                                                background: "transparent",
                                                color: "var(--danger)",
                                                border: "1px solid var(--hairline-strong)",
                                            }}
                                            onClick={() => setDeleting(p)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <AdminPagination
                        page={data.page}
                        totalPages={data.totalPages}
                        hasNextPage={data.hasNextPage}
                        hasPreviousPage={data.hasPreviousPage}
                        onChange={setPage}
                    />
                </>
            )}

            {editing && (
                <AdminPropertyEditModal
                    property={editing}
                    onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <ConfirmDeleteModal
                    title="Delete property?"
                    description={
                        <>
                            <p className="mb-2">
                                You're about to permanently delete <strong>{deleting.title}</strong>.
                            </p>
                            <p className="mb-0">
                                This will also remove all its images, bookings (including confirmed bookings of other users), and reviews. This cannot be undone.
                            </p>
                        </>
                    }
                    confirmLabel="Delete property"
                    isPending={isDeleting}
                    isError={isDeleteError}
                    error={deleteError}
                    onConfirm={handleConfirmDelete}
                    onClose={handleCloseDelete}
                />
            )}
        </div>
    )
}
