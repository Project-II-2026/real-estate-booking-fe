import type {PropertyFormValues} from '../components/property/PropertyForm.tsx'
import {PropertyForm} from '../components/property/PropertyForm.tsx'
import {useAddPropertyWithImages} from '../hooks/useProperties.ts'

const AddProperty = () => {
    const {mutate, isPending, isError, error} = useAddPropertyWithImages()

    const handleSubmit = (data: PropertyFormValues, files: File[]) => {
        mutate({propertyData: data, files})
    }

    return (
        <div className="container py-7">
            <div className="mx-auto" style={{maxWidth: 640}}>
                <div className="eyebrow eyebrow-rule mb-3">List a home</div>
                <h1 className="fw-semibold tracking-tight mb-2" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                    Add a new property.
                </h1>
                <p className="text-bone-muted mb-6" style={{fontSize: "0.9375rem"}}>
                    A few quiet details. The home does the talking.
                </p>

                <PropertyForm
                    showImageUpload
                    submitLabel="List property"
                    onSubmit={handleSubmit}
                    isPending={isPending}
                    isError={isError}
                    error={error}
                />
            </div>
        </div>
    )
}

export default AddProperty
