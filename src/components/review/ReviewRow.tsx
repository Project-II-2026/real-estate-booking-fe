import * as React from 'react'
import type {Review} from '../../models/review.types.ts'
import {formatBookingDateOnly} from '../../utils/bookingTime.ts'

interface Props {
    review: Review
    isLast?: boolean
}

export const ReviewRow: React.FC<Props> = ({review, isLast}) => {
    const filled = Math.max(0, Math.min(5, review.rating))
    const hollow = 5 - filled

    return (
        <div className={`py-4${isLast ? '' : ' hairline-bottom'}`}>
            <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 4,
                            background: "var(--ink-3)",
                        }}
                    >
                        <i className="bi bi-person text-bone-muted" style={{fontSize: 14}}/>
                    </div>
                    <div>
                        <div className="fw-medium" style={{fontSize: "0.9375rem"}}>
                            {review.reviewerUsername}
                        </div>
                        <div className="eyebrow mt-1">
                            {formatBookingDateOnly(review.createdAt)}
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-1">
                    {Array.from({length: filled}).map((_, i) => (
                        <i key={`f-${i}`} className="bi bi-star-fill text-moss" style={{fontSize: "0.75rem"}}/>
                    ))}
                    {Array.from({length: hollow}).map((_, i) => (
                        <i key={`h-${i}`} className="bi bi-star text-bone-faint" style={{fontSize: "0.75rem"}}/>
                    ))}
                </div>
            </div>
            <p className="mb-0 text-bone" style={{fontSize: "0.9375rem", lineHeight: 1.6}}>
                {review.comment || <span className="text-bone-faint">(no comment)</span>}
            </p>
        </div>
    )
}
