import * as React from 'react'
import {useState} from 'react'
import {Link} from 'react-router'
import type {Review} from '../../models/review.types.ts'
import {useAuth} from '../../hooks/useAuth.ts'
import {useDeleteReview, usePropertyReviews} from '../../hooks/useReviews.ts'
import {ReviewRow} from './ReviewRow.tsx'
import {ReviewModal} from './ReviewModal.tsx'

interface Props {
    propertyId: number
    ownerId: number
}

const PAGE_SIZE = 10

export const ReviewsSection: React.FC<Props> = ({propertyId, ownerId}) => {
    const {user} = useAuth()
    const isOwner = user?.id === ownerId

    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [editingReview, setEditingReview] = useState<Review | null>(null)
    const [deleteError, setDeleteError] = useState<string | null>(null)

    const {data, isLoading, isError, error} = usePropertyReviews(propertyId, {page, pageSize: PAGE_SIZE})

    const {mutate: deleteReview, isPending: isDeleting} = useDeleteReview()

    const myReview = user
        ? data?.items.find(r => r.reviewerId === user.id) ?? null
        : null

    const canReview = !!user && !isOwner && !myReview

    const totalCount = data?.totalCount ?? 0
    const averageRating = data?.averageRating ?? 0

    const openCreate = () => {
        setEditingReview(null)
        setShowModal(true)
    }

    const openEdit = () => {
        if (!myReview) return
        setEditingReview(myReview)
        setShowModal(true)
    }

    const handleDelete = () => {
        if (!myReview) return
        const ok = window.confirm('Delete your review? This cannot be undone.')
        if (!ok) return
        setDeleteError(null)
        deleteReview(myReview.id, {
            onSuccess: () => setPage(1),
            onError: (err: unknown) => {
                const message = err instanceof Error ? err.message : 'Could not delete review.'
                setDeleteError(message)
            },
        })
    }

    const renderActions = () => {
        if (!user) {
            return (
                <Link
                    to="/login"
                    className="btn btn-dark btn-sm fw-medium rounded-pill px-4 py-2 shadow-sm text-decoration-none"
                >
                    Log in to leave a review
                </Link>
            )
        }
        if (isOwner) return null

        if (myReview) {
            return (
                <div className="d-flex gap-2">
                    <button
                        type="button"
                        onClick={openEdit}
                        className="btn btn-dark btn-sm fw-medium rounded-pill px-4 py-2 shadow-sm"
                    >
                        Edit your review
                    </button>
                    {!isDeleting ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn btn-light btn-sm fw-medium rounded-pill px-4 py-2 shadow-sm"
                        >
                            Delete
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="btn btn-light btn-sm fw-medium rounded-pill px-4 py-2 shadow-sm"
                        >
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            />
                            Deleting...
                        </button>
                    )}
                </div>
            )
        }

        if (canReview) {
            return (
                <button
                    type="button"
                    onClick={openCreate}
                    className="btn btn-dark btn-sm fw-medium rounded-pill px-4 py-2 shadow-sm"
                >
                    Leave a review
                </button>
            )
        }

        return null
    }

    return (
        <div className="mb-4">
            <h5 className="fw-semibold mb-3">Reviews</h5>

            <div className="d-flex align-items-center justify-content-between gap-3 mb-4 flex-wrap">
                {totalCount === 0 ? (
                    <span className="text-body-secondary">No reviews yet</span>
                ) : (
                    <div className="d-flex align-items-center gap-2">
                        <span className="fs-3 fw-semibold">{averageRating.toFixed(1)}</span>
                        <div className="d-flex gap-1 text-warning">
                            {[1, 2, 3, 4, 5].map(i => (
                                <i
                                    key={i}
                                    className={
                                        i <= Math.round(averageRating)
                                            ? 'bi bi-star-fill'
                                            : 'bi bi-star text-body-secondary'
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-body-secondary small">
                            ({totalCount} {totalCount === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                )}
                {renderActions()}
            </div>

            {deleteError && (
                <div className="alert alert-danger py-2 small mb-3">
                    {deleteError}
                </div>
            )}

            {isLoading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-dark border-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger py-2 small">
                    {error?.message ?? 'Could not load reviews.'}
                </div>
            )}

            {!isLoading && !isError && data && data.items.length === 0 && totalCount > 0 && (
                <p className="text-body-secondary">No reviews on this page.</p>
            )}

            {data?.items.map(review => (
                <ReviewRow key={review.id} review={review}/>
            ))}

            {data && data.totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                    <button
                        type="button"
                        className="btn btn-light rounded-pill btn-sm shadow-sm"
                        disabled={!data.hasPreviousPage}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </button>
                    <span className="small text-body-secondary">
                        Page {data.page} of {data.totalPages}
                    </span>
                    <button
                        type="button"
                        className="btn btn-light rounded-pill btn-sm shadow-sm"
                        disabled={!data.hasNextPage}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {showModal && (
                <ReviewModal
                    key={editingReview?.id ?? 'new'}
                    onClose={() => setShowModal(false)}
                    propertyId={propertyId}
                    initialReview={editingReview ?? undefined}
                    onSubmitted={() => setPage(1)}
                />
            )}
        </div>
    )
}
