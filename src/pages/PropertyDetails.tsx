import {useState} from 'react'
import {useParams} from 'react-router'
import {useProperty} from '../hooks/useProperties.ts'
import {useAuth} from '../hooks/useAuth.ts'
import {BookVisitCard} from '../components/booking/BookVisitCard.tsx'
import {VisitRequestsPanel} from '../components/booking/VisitRequestsPanel.tsx'
import {ReviewsSection} from '../components/review/ReviewsSection.tsx'

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
]

const PropertyDetails = () => {
    const {id} = useParams()
    const {data: property, isLoading, isError, error} = useProperty(Number(id))
    const {user} = useAuth()

    const [activeIndex, setActiveIndex] = useState(0)

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-dark border-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (isError || !property) {
        return (
            <div className="container-xl py-5">
                <div className="alert alert-danger py-2 small">
                    {error?.message ?? 'Failed to load property.'}
                </div>
            </div>
        )
    }

    const images = property.images.length > 0
        ? property.images
        : [FALLBACK_IMAGES[property.id % 3]]

    const isOwner = user?.id === property.ownerId

    const handlePrev = () => setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
    const handleNext = () => setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))

    return (
        <div className="align-self-start w-100 py-5">
            <div className="container-xl">

                {/* Hero carousel */}
                <div className="mb-4">
                    <div className="position-relative overflow-hidden rounded-4 shadow-sm"
                         style={{aspectRatio: '16/9'}}>
                        <img
                            src={images[activeIndex]}
                            alt={`${property.title} - ${activeIndex + 1}`}
                            className="w-100 h-100 object-fit-cover"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="btn btn-dark rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 d-flex align-items-center justify-content-center shadow-sm"
                                    style={{width: 40, height: 40}}
                                    aria-label="Previous image"
                                >
                                    <i className="bi bi-chevron-left"/>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="btn btn-dark rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center justify-content-center shadow-sm"
                                    style={{width: 40, height: 40}}
                                    aria-label="Next image"
                                >
                                    <i className="bi bi-chevron-right"/>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {images.length > 1 && (
                        <div className="d-flex gap-2 mt-3 flex-wrap">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveIndex(idx)}
                                    className={`p-0 border-0 bg-transparent rounded-3 overflow-hidden shadow-sm ${idx === activeIndex ? 'opacity-100 border border-2 border-light' : 'opacity-50'}`}
                                    style={{width: 64, height: 64, cursor: 'pointer'}}
                                    aria-label={`View image ${idx + 1}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Two-column content */}
                <div className="row g-5 mt-2">

                    {/* Left column */}
                    <div className="col-lg-7">

                        {/* Header */}
                        <div className="mb-4">
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="badge text-bg-dark bg-opacity-75 rounded-pill px-3 py-2 shadow-sm">
                                    {property.type}
                                </span>
                            </div>
                            <h1 className="fw-semibold mb-1">{property.title}</h1>
                            <p className="text-body-secondary mb-0">
                                <i className="bi bi-geo-alt-fill me-1"/>{property.location}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="d-flex gap-4 mb-4 text-body-secondary flex-wrap">
                            <span><i className="bi bi-door-open-fill me-2"/>{property.numberOfBedrooms} Bedrooms</span>
                            <span><i className="bi bi-droplet-fill me-2"/>{property.numberOfBathrooms} Bathrooms</span>
                            <span><i className="bi bi-aspect-ratio-fill me-2"/>{property.sizeInSquareMeters} m²</span>
                        </div>

                        {/* Description */}
                        <hr className="border-opacity-25"/>
                        <div className="mb-4">
                            <h5 className="fw-semibold mb-3">About this property</h5>
                            <p className="text-body-secondary" style={{lineHeight: 1.8}}>{property.description}</p>
                        </div>

                        {/* Listed by */}
                        <hr className="border-opacity-25"/>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div
                                className="rounded-circle bg-body-tertiary shadow-sm d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{width: 48, height: 48}}>
                                <i className="bi bi-person-fill fs-5 text-body-secondary"/>
                            </div>
                            <div>
                                <p className="mb-0 small fw-semibold">Listed by</p>
                                <p className="mb-0 text-body-secondary small">{property.ownerUsername}</p>
                            </div>
                        </div>

                        {/* Reviews */}
                        <hr className="border-opacity-25"/>
                        <ReviewsSection propertyId={property.id} ownerId={property.ownerId}/>
                    </div>

                    {/* Right column — sticky sidebar */}
                    <div className="col-lg-5">
                        <div className="sticky-top" style={{top: 80}}>

                            {/* Price card */}
                            <div className="bg-body-tertiary rounded-4 shadow-sm p-4 mb-4">
                                <div className="d-flex align-items-baseline gap-2 mb-1">
                                    <span className="display-6 fw-semibold">
                                        €{property.price.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-body-secondary small mb-0">Listed price</p>
                            </div>

                            {/* Book a visit card */}
                            <BookVisitCard property={property}/>

                            {isOwner && <VisitRequestsPanel propertyId={property.id}/>}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyDetails
