import * as React from 'react'

interface Props {
    title: string
    description: React.ReactNode
    confirmLabel?: string
    isPending: boolean
    isError: boolean
    error?: Error | null
    onConfirm: () => void
    onClose: () => void
}

const BACKDROP_STYLE: React.CSSProperties = {
    backgroundColor: "rgba(10, 9, 7, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
}

export const ConfirmDeleteModal: React.FC<Props> = ({
                                                        title,
                                                        description,
                                                        confirmLabel = 'Delete',
                                                        isPending,
                                                        isError,
                                                        error,
                                                        onConfirm,
                                                        onClose,
                                                    }) => {
    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={BACKDROP_STYLE}
            onClick={() => !isPending && onClose()}
        >
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-start">
                        <div>
                            <div className="eyebrow mb-1">Confirm</div>
                            <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                {title}
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
                        <div className="text-bone-muted" style={{fontSize: "0.9375rem", lineHeight: 1.6}}>
                            {description}
                        </div>

                        {isError && (
                            <div className="alert alert-danger mt-3 mb-0">
                                {error?.message ?? 'Could not complete the action.'}
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
                                type="button"
                                className="btn fw-medium"
                                style={{
                                    background: "var(--danger)",
                                    color: "var(--ink)",
                                    borderColor: "var(--danger)",
                                }}
                                onClick={onConfirm}
                            >
                                {confirmLabel}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn fw-medium"
                                style={{
                                    background: "var(--danger)",
                                    color: "var(--ink)",
                                    borderColor: "var(--danger)",
                                }}
                                disabled
                            >
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                                Working…
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
