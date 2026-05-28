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
                <Link to="/login" className="btn btn-light btn-sm fw-medium">
                    Sign in to review
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
                        className="btn btn-primary btn-sm fw-medium"
                    >
                        Edit
                    </button>
                    {!isDeleting ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn btn-light btn-sm fw-medium"
                        >
                            Delete
                        </button>
                    ) : (
                        <button type="button" disabled className="btn btn-light btn-sm">
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            />
                            Deleting…
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
                    className="btn btn-primary btn-sm fw-medium"
                >
                    Leave a review
                </button>
            )
        }

        return null
    }

    return (
        <div>
            <div className="eyebrow eyebrow-rule mb-3">Reviews</div>

            <div className="d-flex align-items-center justify-content-between gap-3 mb-4 flex-wrap">
                {totalCount === 0 ? (
                    <span className="text-bone-muted">No reviews yet</span>
                ) : (
                    <div className="d-flex align-items-baseline gap-3">
                        <span className="fw-semibold tracking-tight" style={{fontSize: "2rem"}}>
                            {averageRating.toFixed(1)}
                        </span>
                        <div className="d-flex align-items-baseline gap-2">
                            <div className="d-flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <i
                                        key={i}
                                        className={
                                            i <= Math.round(averageRating)
                                                ? 'bi bi-star-fill text-moss'
                                                : 'bi bi-star text-bone-faint'
                                        }
                                        style={{fontSize: "0.75rem"}}
                                    />
                                ))}
                            </div>
                            <span className="text-bone-muted small">
                                {totalCount} {totalCount === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>
                    </div>
                )}
                {renderActions()}
            </div>

            {deleteError && (
                <div className="alert alert-danger mb-3">
                    {deleteError}
                </div>
            )}

            {isLoading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-bone-muted" role="status">
                        <span className="visually-hidden">Loading…</span>
                    </div>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger">
                    {error?.message ?? 'Could not load reviews.'}
                </div>
            )}

            {!isLoading && !isError && data && data.items.length === 0 && totalCount > 0 && (
                <p className="text-bone-muted">No reviews on this page.</p>
            )}

            {data && data.items.length > 0 && (
                <div className="d-flex flex-column">
                    {data.items.map((review, idx) => (
                        <ReviewRow
                            key={review.id}
                            review={review}
                            isLast={idx === data.items.length - 1}
                        />
                    ))}
                </div>
            )}

            {data && data.totalPages > 1 && (
                <div className="hairline-top mt-4 pt-3 d-flex justify-content-between align-items-center">
                    <button
                        type="button"
                        className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                        disabled={!data.hasPreviousPage}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        style={{opacity: data.hasPreviousPage ? 1 : 0.3}}
                    >
                        <i className="bi bi-arrow-left"/>
                        Previous
                    </button>
                    <span className="small text-bone-muted">
                        Page {data.page} of {data.totalPages}
                    </span>
                    <button
                        type="button"
                        className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                        disabled={!data.hasNextPage}
                        onClick={() => setPage(p => p + 1)}
                        style={{opacity: data.hasNextPage ? 1 : 0.3}}
                    >
                        Next
                        <i className="bi bi-arrow-right"/>
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
