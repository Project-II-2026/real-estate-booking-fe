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
        <div className="container d-flex justify-content-center py-5 align-self-start w-100">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                <div className="text-center mb-4">
                    <h1 className="fs-3 fw-semibold mb-1">Edit Property</h1>
                    <p className="text-body-secondary mb-0">Update the details of your listing.</p>
                </div>

                {isLoadingProperty && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-dark border-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {isPropertyError && (
                    <div className="alert alert-danger py-2 small">
                        {propertyError?.message ?? 'Failed to load property.'}
                    </div>
                )}

                {property && (
                    <div className="card border-0 shadow-sm rounded-4 bg-body-tertiary px-4 py-4">
                        <PropertyForm
                            initialValues={property}
                            submitLabel="Save Changes"
                            onSubmit={handleSubmit}
                            isPending={isPending}
                            isError={isError}
                            error={error}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditProperty
