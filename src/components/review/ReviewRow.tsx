import * as React from 'react'
import type {Review} from '../../models/review.types.ts'
import {formatBookingDateOnly} from '../../utils/bookingTime.ts'

interface Props {
    review: Review
}

export const ReviewRow: React.FC<Props> = ({review}) => {
    const filled = Math.max(0, Math.min(5, review.rating))
    const hollow = 5 - filled

    return (
        <div className="bg-body-tertiary rounded-4 p-4 mb-3 shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="rounded-circle bg-body shadow-sm d-flex align-items-center justify-content-center"
                        style={{width: 36, height: 36}}
                    >
                        <i className="bi bi-person-fill text-body-secondary"/>
                    </div>
                    <span className="fw-semibold small">{review.reviewerUsername}</span>
                </div>
                <span className="text-body-secondary small">
                    {formatBookingDateOnly(review.createdAt)}
                </span>
            </div>
            <div className="d-flex gap-1 mb-2">
                {Array.from({length: filled}).map((_, i) => (
                    <i key={`f-${i}`} className="bi bi-star-fill small text-warning"/>
                ))}
                {Array.from({length: hollow}).map((_, i) => (
                    <i key={`h-${i}`} className="bi bi-star small text-body-secondary"/>
                ))}
            </div>
            <p className="mb-0 small text-body-secondary">
                {review.comment || '(no comment)'}
            </p>
        </div>
    )
}
