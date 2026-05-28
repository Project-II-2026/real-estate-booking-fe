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
    const [isDragOver, setIsDragOver] = useState(false)
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

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => setIsDragOver(false)

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragOver(false)
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
                <div className="alert alert-danger mb-4">
                    {error?.message ?? 'Something went wrong.'}
                </div>
            )}
            {localError && (
                <div className="alert alert-warning mb-4">
                    {localError}
                </div>
            )}

            {/* SECTION: Basics */}
            <section className="mb-5">
                <div className="eyebrow mb-3">Basics</div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Restored townhouse in Andrei Mureșanu"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="type" className="form-label">Property type</label>
                        <select
                            id="type"
                            className="form-select"
                            value={form.type}
                            onChange={handleSelectChange}
                            required
                        >
                            <option value={PropertyType.House}>House</option>
                            <option value={PropertyType.Apartment}>Apartment</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* SECTION: Location */}
            <section className="hairline-top pt-5 mb-5">
                <div className="eyebrow mb-3">Location</div>

                <div>
                    <label htmlFor="location" className="form-label">Address</label>
                    <input
                        id="location"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Mănăștur, Cluj-Napoca"
                        value={form.location}
                        onChange={handleChange}
                        required
                    />
                </div>
            </section>

            {/* SECTION: Specs */}
            <section className="hairline-top pt-5 mb-5">
                <div className="eyebrow mb-3">Specs</div>

                <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                        <label htmlFor="price" className="form-label">Price (€)</label>
                        <input
                            id="price"
                            type="number"
                            className="form-control"
                            placeholder="185000"
                            min="0"
                            step="0.01"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="sizeInSquareMeters" className="form-label">Area (m²)</label>
                        <input
                            id="sizeInSquareMeters"
                            type="number"
                            className="form-control"
                            placeholder="110"
                            min="0"
                            step="0.01"
                            value={form.sizeInSquareMeters}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="numberOfBedrooms" className="form-label">Bedrooms</label>
                        <input
                            id="numberOfBedrooms"
                            type="number"
                            className="form-control"
                            placeholder="3"
                            min="0"
                            step="1"
                            value={form.numberOfBedrooms}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="numberOfBathrooms" className="form-label">Bathrooms</label>
                        <input
                            id="numberOfBathrooms"
                            type="number"
                            className="form-control"
                            placeholder="2"
                            min="0"
                            step="1"
                            value={form.numberOfBathrooms}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </section>

            {/* SECTION: Description */}
            <section className="hairline-top pt-5 mb-5">
                <div className="eyebrow mb-3">Description</div>

                <div>
                    <label htmlFor="description" className="form-label">About this property</label>
                    <textarea
                        id="description"
                        className="form-control"
                        placeholder="Tell prospective buyers what makes this home considered…"
                        rows={5}
                        value={form.description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
            </section>

            {/* SECTION: Photos */}
            {showImageUpload && (
                <section className="hairline-top pt-5 mb-5">
                    <div className="d-flex justify-content-between align-items-baseline mb-3">
                        <div className="eyebrow">Photos</div>
                        <span className="text-bone-faint small">{images.length} / {MAX_IMAGES}</span>
                    </div>

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
                            className={`uploader${isDragOver ? ' drag-over' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                        >
                            <i className="bi bi-image fs-3 d-block mb-2"/>
                            <div className="fw-medium mb-1" style={{fontSize: "0.9375rem"}}>
                                Drag &amp; drop or click to select
                            </div>
                            <div className="text-bone-faint small">
                                JPG, PNG, WebP &middot; up to {MAX_IMAGES} photos
                            </div>
                        </div>
                    )}

                    {images.length > 0 && (
                        <div className="row row-cols-2 row-cols-md-4 g-3 mt-3">
                            {images.map(({previewUrl, file}, idx) => (
                                <div key={previewUrl} className="col position-relative">
                                    <img
                                        src={previewUrl}
                                        alt={file.name}
                                        className="w-100 d-block"
                                        style={{aspectRatio: '1', objectFit: 'cover', borderRadius: 4}}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: 2,
                                            background: "var(--ink-3)",
                                            border: "1px solid var(--hairline-strong)",
                                            color: "var(--bone)",
                                            fontSize: 12,
                                            cursor: 'pointer',
                                            padding: 0,
                                        }}
                                        aria-label="Remove image"
                                    >
                                        <i className="bi bi-x"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Submit */}
            <div className="hairline-top pt-5">
                {!isPending ? (
                    <button type="submit" className="btn btn-primary fw-medium px-5 d-inline-flex align-items-center gap-2">
                        {submitLabel}
                        <i className="bi bi-arrow-right"/>
                    </button>
                ) : (
                    <button type="button" className="btn btn-primary px-5" disabled>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                        {submitLabel}…
                    </button>
                )}
            </div>
        </form>
    )
}
