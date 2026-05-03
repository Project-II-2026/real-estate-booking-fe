import type {PropertyFormValues} from '../components/property/PropertyForm.tsx'
import {PropertyForm} from '../components/property/PropertyForm.tsx'
import {useAddPropertyWithImages} from '../hooks/useProperties.ts'

const AddProperty = () => {
    const {mutate, isPending, isError, error} = useAddPropertyWithImages()

    const handleSubmit = (data: PropertyFormValues, files: File[]) => {
        mutate({propertyData: data, files})
    }

    return (
        <div className="container d-flex justify-content-center py-5 align-self-start w-100">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                <div className="text-center mb-4">
                    <h1 className="fs-3 fw-semibold mb-1">Add New Property</h1>
                    <p className="text-body-secondary mb-0">Fill in the details to list your property.</p>
                </div>

                <div className="card border-0 shadow-sm rounded-4 bg-body-tertiary px-4 py-4">
                    <PropertyForm
                        showImageUpload
                        submitLabel="List Property"
                        onSubmit={handleSubmit}
                        isPending={isPending}
                        isError={isError}
                        error={error}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddProperty
