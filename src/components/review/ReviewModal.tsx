import * as React from 'react'
import {useState} from 'react'
import type {Review} from '../../models/review.types.ts'
import {useCreateReview, useUpdateReview} from '../../hooks/useReviews.ts'

interface Props {
    onClose: () => void
    propertyId: number
    initialReview?: Review
    onSubmitted?: () => void
}

const BACKDROP_STYLE: React.CSSProperties = {
    backgroundColor: "rgba(10, 9, 7, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
};

export const ReviewModal: React.FC<Props> = ({onClose, propertyId, initialReview, onSubmitted}) => {
    const isEdit = !!initialReview
    const [rating, setRating] = useState<number>(initialReview?.rating ?? 0)
    const [comment, setComment] = useState<string>(initialReview?.comment ?? '')

    const {
        mutate: createReview,
        isPending: isCreating,
        isError: isCreateError,
        error: createError,
    } = useCreateReview()

    const {
        mutate: updateReview,
        isPending: isUpdating,
        isError: isUpdateError,
        error: updateError,
    } = useUpdateReview()

    const isPending = isCreating || isUpdating
    const isError = isCreateError || isUpdateError
    const error = createError ?? updateError

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (rating < 1) return

        const handleSuccess = () => {
            onSubmitted?.()
            onClose()
        }

        if (isEdit && initialReview) {
            updateReview(
                {id: initialReview.id, data: {rating, comment}},
                {onSuccess: handleSuccess},
            )
        } else {
            createReview(
                {propertyId, rating, comment},
                {onSuccess: handleSuccess},
            )
        }
    }

    return (
        <div className="modal show d-block" tabIndex={-1} style={BACKDROP_STYLE} onClick={() => !isPending && onClose()}>
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-start">
                            <div>
                                <div className="eyebrow mb-1">Review</div>
                                <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                    {isEdit ? 'Edit your review' : 'Leave a review'}
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="icon-btn"
                                onClick={onClose}
                                aria-label="Close"
                                disabled={isPending}
                            >
                                <i className="bi bi-x-lg"/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label className="form-label">
                                Your rating
                            </label>
                            <div className="d-flex gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map(value => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setRating(value)}
                                        className="btn btn-link p-0 border-0"
                                        disabled={isPending}
                                        aria-label={`Set rating to ${value}`}
                                        style={{fontSize: "1.5rem", lineHeight: 1}}
                                    >
                                        <i
                                            className={
                                                value <= rating
                                                    ? 'bi bi-star-fill text-moss'
                                                    : 'bi bi-star text-bone-faint'
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            <label htmlFor="reviewComment" className="form-label">
                                Your comment (optional)
                            </label>
                            <textarea
                                id="reviewComment"
                                className="form-control"
                                rows={4}
                                maxLength={1000}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                disabled={isPending}
                            />
                            <div className="small text-bone-faint text-end mt-1">
                                {comment.length} / 1000
                            </div>

                            {isError && (
                                <div className="alert alert-danger mt-3 mb-0">
                                    {error?.message ?? 'Could not save your review.'}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light fw-medium"
                                onClick={onClose}
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                            {!isPending ? (
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-medium"
                                    disabled={rating < 1}
                                >
                                    {isEdit ? 'Save changes' : 'Submit review'}
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary" disabled>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? 'Saving…' : 'Submitting…'}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
