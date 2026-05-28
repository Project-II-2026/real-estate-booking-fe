import * as React from 'react'
import type {PropertyResponseDto} from '../../models/property.types.ts'
import {PropertyForm, type PropertyFormValues} from '../property/PropertyForm.tsx'
import {useAdminUpdateProperty} from '../../hooks/useProperties.ts'

interface Props {
    property: PropertyResponseDto
    onClose: () => void
}

const BACKDROP_STYLE: React.CSSProperties = {
    backgroundColor: "rgba(10, 9, 7, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
}

export const AdminPropertyEditModal: React.FC<Props> = ({property, onClose}) => {
    const {mutate, reset, isPending, isError, error} = useAdminUpdateProperty()

    const handleSubmit = (data: PropertyFormValues) => {
        reset()
        mutate({id: property.id, data}, {onSuccess: () => onClose()})
    }

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={BACKDROP_STYLE}
            onClick={() => !isPending && onClose()}
        >
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-start">
                        <div>
                            <div className="eyebrow mb-1">Admin · Edit listing</div>
                            <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                {property.title}
                            </h2>
                            <p className="small text-bone-muted mb-0 mt-1">
                                Owner: {property.ownerUsername}
                            </p>
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
                        <PropertyForm
                            initialValues={property}
                            submitLabel="Save changes"
                            onSubmit={handleSubmit}
                            isPending={isPending}
                            isError={isError}
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
