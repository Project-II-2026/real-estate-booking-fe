import {useParams} from 'react-router'
import type {PropertyFormValues} from '../components/property/PropertyForm.tsx'
import {PropertyForm} from '../components/property/PropertyForm.tsx'
import {useProperty, useUpdateProperty} from '../hooks/useProperties.ts'

const EditProperty = () => {
    const {id} = useParams()

    const {
        data: property,
        isLoading: isLoadingProperty,
        isError: isPropertyError,
        error: propertyError,
    } = useProperty(Number(id))

    const {mutate, reset, isPending, isError, error} = useUpdateProperty()

    const handleSubmit = (data: PropertyFormValues) => {
        reset()
        mutate({id: Number(id), data})
    }

    return (
        <div className="container py-7">
            <div className="mx-auto" style={{maxWidth: 640}}>
                <div className="eyebrow eyebrow-rule mb-3">Edit listing</div>
                <h1 className="fw-semibold tracking-tight mb-2" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                    Refine the details.
                </h1>
                <p className="text-bone-muted mb-6" style={{fontSize: "0.9375rem"}}>
                    Update what's changed.
                </p>

                {isLoadingProperty && (
                    <div className="text-center py-7">
                        <div className="spinner-border text-bone-muted" role="status">
                            <span className="visually-hidden">Loading…</span>
                        </div>
                    </div>
                )}

                {isPropertyError && (
                    <div className="alert alert-danger">
                        {propertyError?.message ?? 'Failed to load property.'}
                    </div>
                )}

                {property && (
                    <PropertyForm
                        initialValues={property}
                        submitLabel="Save changes"
                        onSubmit={handleSubmit}
                        isPending={isPending}
                        isError={isError}
                        error={error}
                    />
                )}
            </div>
        </div>
    )
}

export default EditProperty
