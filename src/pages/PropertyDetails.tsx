import {useState} from 'react'
import {useParams} from 'react-router'
import {useProperty} from '../hooks/useProperties.ts'
import {useAuth} from '../hooks/useAuth.ts'
import {BookVisitCard} from '../components/booking/BookVisitCard.tsx'
import {VisitRequestsPanel} from '../components/booking/VisitRequestsPanel.tsx'
import {ReviewsSection} from '../components/review/ReviewsSection.tsx'

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80',
]

const PropertyDetails = () => {
    const {id} = useParams()
    const {data: property, isLoading, isError, error} = useProperty(Number(id))
    const {user} = useAuth()

    const [activeIndex, setActiveIndex] = useState(0)

    if (isLoading) {
        return (
            <div className="text-center py-7">
                <div className="spinner-border text-bone-muted" role="status">
                    <span className="visually-hidden">Loading…</span>
                </div>
            </div>
        )
    }

    if (isError || !property) {
        return (
            <div className="container py-7">
                <div className="alert alert-danger">
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
        <div className="w-100">
            <div className="container py-7">
                {/* Hero media block */}
                <div
                    className="position-relative overflow-hidden mb-3"
                    style={{aspectRatio: '16/9', borderRadius: 8}}
                >
                    <img
                        src={images[activeIndex]}
                        alt={`${property.title} — ${activeIndex + 1}`}
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    />
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="icon-btn position-absolute top-50 start-0 translate-middle-y ms-3"
                                aria-label="Previous image"
                                style={{
                                    background: "rgba(20, 19, 15, 0.55)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid var(--hairline-strong)",
                                }}
                            >
                                <i className="bi bi-chevron-left"/>
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="icon-btn position-absolute top-50 end-0 translate-middle-y me-3"
                                aria-label="Next image"
                                style={{
                                    background: "rgba(20, 19, 15, 0.55)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid var(--hairline-strong)",
                                }}
                            >
                                <i className="bi bi-chevron-right"/>
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div className="d-flex gap-2 mb-6 flex-wrap">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className="p-0 border-0 bg-transparent overflow-hidden"
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    boxShadow: idx === activeIndex
                                        ? "0 0 0 2px var(--moss)"
                                        : "0 0 0 1px var(--hairline)",
                                    opacity: idx === activeIndex ? 1 : 0.65,
                                    transition: "opacity 180ms ease",
                                }}
                                aria-label={`View image ${idx + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="w-100 h-100 object-fit-cover d-block"
                                />
                            </button>
                        ))}
                    </div>
                )}

                <div className="row g-5 hairline-top pt-5">
                    {/* Left: content */}
                    <div className="col-lg-8">
                        <div className="eyebrow eyebrow-rule mb-3">
                            {property.type} · for sale
                        </div>
                        <h1 className="fw-semibold tracking-tight mb-2" style={{fontSize: "2.5rem", lineHeight: 1.08}}>
                            {property.title}
                        </h1>
                        <p className="text-bone-muted mb-5 d-inline-flex align-items-center gap-2" style={{fontSize: "1rem"}}>
                            <i className="bi bi-geo-alt"/>
                            {property.location}
                        </p>

                        {/* Stats row */}
                        <div className="hairline-y py-4 mb-5">
                            <div className="row g-3">
                                <div className="col-4">
                                    <div className="eyebrow mb-2">Bedrooms</div>
                                    <div className="fw-medium tracking-snug" style={{fontSize: "1.5rem"}}>
                                        {property.numberOfBedrooms}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="eyebrow mb-2">Bathrooms</div>
                                    <div className="fw-medium tracking-snug" style={{fontSize: "1.5rem"}}>
                                        {property.numberOfBathrooms}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="eyebrow mb-2">Area</div>
                                    <div className="fw-medium tracking-snug" style={{fontSize: "1.5rem"}}>
                                        {property.sizeInSquareMeters}<span className="text-bone-muted" style={{fontSize: "1rem", marginLeft: 4}}>m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-5" style={{maxWidth: "64ch"}}>
                            <div className="eyebrow mb-3">About this property</div>
                            <p className="text-bone" style={{lineHeight: 1.7, fontSize: "1rem"}}>
                                {property.description}
                            </p>
                        </div>

                        {/* Listed by */}
                        <div className="surface p-4 mb-5 d-flex align-items-center gap-3" style={{maxWidth: 420}}>
                            <div
                                className="d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 4,
                                    background: "var(--ink-3)",
                                }}
                            >
                                <i className="bi bi-person fs-5 text-bone-muted"/>
                            </div>
                            <div>
                                <div className="eyebrow mb-1">Listed by</div>
                                <div className="fw-medium" style={{fontSize: "0.9375rem"}}>
                                    {property.ownerUsername}
                                </div>
                            </div>
                        </div>

                        <div className="hairline-top pt-5">
                            <ReviewsSection propertyId={property.id} ownerId={property.ownerId}/>
                        </div>
                    </div>

                    {/* Right: sticky sidebar */}
                    <div className="col-lg-4">
                        <div className="sticky-top" style={{top: 96}}>
                            <div className="surface p-4 mb-3" style={{boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)"}}>
                                <div className="eyebrow mb-2">Listed price</div>
                                <div className="d-flex align-items-baseline gap-2 mb-4">
                                    <span className="fw-semibold tracking-tight" style={{fontSize: "2rem"}}>
                                        €{property.price.toLocaleString()}
                                    </span>
                                    <span className="text-bone-muted small">EUR</span>
                                </div>
                                <BookVisitCard property={property}/>
                            </div>

                            {isOwner && (
                                <div className="mt-4">
                                    <VisitRequestsPanel propertyId={property.id}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails
