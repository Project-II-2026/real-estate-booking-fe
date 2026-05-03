import React, {useEffect, useRef, useState} from 'react'
import {PropertyType} from '../../models/property.types.ts'

interface ImageEntry {
    file: File
    previewUrl: string
}

export interface PropertyFormValues {
    title: string
    description: string
    price: number
    location: string
    type: PropertyType
    numberOfBedrooms: number
    numberOfBathrooms: number
    sizeInSquareMeters: number
}

interface PropertyFormProps {
    initialValues?: Partial<PropertyFormValues>
    onSubmit: (data: PropertyFormValues, files: File[]) => void
    isPending: boolean
    isError: boolean
    error?: Error | null
    submitLabel: string
    showImageUpload?: boolean
}

const MAX_IMAGES = 20

export const PropertyForm: React.FC<PropertyFormProps> = ({
                                                              initialValues,
                                                              onSubmit,
                                                              isPending,
                                                              isError,
                                                              error,
                                                              submitLabel,
                                                              showImageUpload = false,
                                                          }) => {
    const [form, setForm] = useState({
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
        price: initialValues?.price != null ? String(initialValues.price) : '',
        location: initialValues?.location ?? '',
        type: initialValues?.type ?? PropertyType.House,
        numberOfBedrooms: initialValues?.numberOfBedrooms != null ? String(initialValues.numberOfBedrooms) : '',
        numberOfBathrooms: initialValues?.numberOfBathrooms != null ? String(initialValues.numberOfBathrooms) : '',
        sizeInSquareMeters: initialValues?.sizeInSquareMeters != null ? String(initialValues.sizeInSquareMeters) : '',
    })

    const [localError, setLocalError] = useState('')
    const [images, setImages] = useState<ImageEntry[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        return () => images.forEach(img => URL.revokeObjectURL(img.previewUrl))
    }, [images])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target
        setForm(prev => ({...prev, [id]: value}))
        setLocalError('')
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm(prev => ({...prev, description: event.target.value}))
        setLocalError('')
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {id, value} = event.target
        setForm(prev => ({...prev, [id]: value}))
        setLocalError('')
    }

    const addFiles = (files: FileList | File[]) => {
        const incoming = Array.from(files).filter(f => f.type.startsWith('image/'))
        const remaining = MAX_IMAGES - images.length
        if (remaining <= 0) return
        const toAdd = incoming.slice(0, remaining).map(file => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }))
        setImages(prev => [...prev, ...toAdd])
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) addFiles(event.target.files)
        event.target.value = ''
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        addFiles(Array.from(event.dataTransfer.files))
    }

    const handleRemoveImage = (idx: number) => {
        setImages(prev => {
            URL.revokeObjectURL(prev[idx].previewUrl)
            return prev.filter((_, i) => i !== idx)
        })
    }

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const price = parseFloat(form.price)
        const sizeInSquareMeters = parseFloat(form.sizeInSquareMeters)
        const numberOfBedrooms = parseInt(form.numberOfBedrooms, 10)
        const numberOfBathrooms = parseInt(form.numberOfBathrooms, 10)

        if (isNaN(price) || price <= 0) {
            setLocalError('Please enter a valid price.')
            return
        }
        if (isNaN(sizeInSquareMeters) || sizeInSquareMeters <= 0) {
            setLocalError('Please enter a valid size.')
            return
        }

        onSubmit(
            {
                title: form.title,
                description: form.description,
                price,
                location: form.location,
                type: form.type,
                numberOfBedrooms,
                numberOfBathrooms,
                sizeInSquareMeters,
            },
            images.map(img => img.file)
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            {isError && (
                <div className="alert alert-danger py-2 small mb-4">
                    {error?.message ?? 'Something went wrong.'}
                </div>
            )}
            {localError && (
                <div className="alert alert-warning py-2 small mb-4">
                    {localError}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="title" className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                    placeholder="e.g. Modern apartment in city center"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    className="form-control bg-body border-0 shadow-sm rounded-4 px-3 py-3"
                    placeholder="Describe the property..."
                    rows={4}
                    value={form.description}
                    onChange={handleDescriptionChange}
                    required
                />
            </div>

            <div className="row g-3 mb-3">
                <div className="col-sm-6">
                    <label htmlFor="price" className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                        Price (€)
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                        placeholder="250000"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-sm-6">
                    <label htmlFor="location" className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                        placeholder="e.g. Bucharest, Romania"
                        value={form.location}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="type" className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                    Property Type
                </label>
                <select
                    id="type"
                    className="form-select form-select-lg bg-body border-0 shadow-sm rounded-4 px-3"
                    value={form.type}
                    onChange={handleSelectChange}
                    required
                >
                    <option value={PropertyType.House}>House</option>
                    <option value={PropertyType.Apartment}>Apartment</option>
                </select>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-sm-4">
                    <label htmlFor="numberOfBedrooms"
                           className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                        Bedrooms
                    </label>
                    <input
                        id="numberOfBedrooms"
                        type="number"
                        className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                        placeholder="3"
                        min="0"
                        step="1"
                        value={form.numberOfBedrooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="numberOfBathrooms"
                           className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                        Bathrooms
                    </label>
                    <input
                        id="numberOfBathrooms"
                        type="number"
                        className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                        placeholder="2"
                        min="0"
                        step="1"
                        value={form.numberOfBathrooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="sizeInSquareMeters"
                           className="form-label small fw-semibold text-body-secondary ms-2 mb-2">
                        Size (m²)
                    </label>
                    <input
                        id="sizeInSquareMeters"
                        type="number"
                        className="form-control form-control-lg bg-body border-0 shadow-sm rounded-4 px-3"
                        placeholder="85"
                        min="0"
                        step="0.01"
                        value={form.sizeInSquareMeters}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {showImageUpload && (
                <div className="mb-4">
                    <label
                        className="form-label small fw-semibold text-body-secondary ms-2 mb-2 d-flex align-items-center gap-2">
                        Photos
                        <span className="badge bg-body text-body-secondary rounded-pill shadow-sm fw-normal">
                            {images.length}/{MAX_IMAGES}
                        </span>
                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        className="d-none"
                        onChange={handleFileSelect}
                    />

                    {images.length < MAX_IMAGES && (
                        <div
                            className="bg-body rounded-4 border border-opacity-25 p-4 text-center"
                            style={{borderStyle: 'dashed', cursor: 'pointer'}}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                        >
                            <p className="mb-1 small fw-semibold text-body-secondary">
                                Drag &amp; drop or click to select
                            </p>
                            <p className="mb-0 small text-secondary">
                                JPG, PNG, WebP &middot; up to {MAX_IMAGES} photos
                            </p>
                        </div>
                    )}

                    {images.length > 0 && (
                        <div className="row row-cols-3 row-cols-md-5 g-2 mt-2">
                            {images.map(({previewUrl, file}, idx) => (
                                <div key={previewUrl} className="col position-relative">
                                    <img
                                        src={previewUrl}
                                        alt={file.name}
                                        className="w-100 rounded-3 shadow-sm"
                                        style={{aspectRatio: '1', objectFit: 'cover'}}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-1 d-flex align-items-center justify-content-center shadow-sm"
                                        style={{width: 22, height: 22, fontSize: 14, padding: 0}}
                                        aria-label="Remove image"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!isPending ? (
                <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold rounded-pill shadow-sm mt-3">
                    {submitLabel}
                </button>
            ) : (
                <button type="button" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm mt-3" disabled>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                    {submitLabel}...
                </button>
            )}
        </form>
    )
}
