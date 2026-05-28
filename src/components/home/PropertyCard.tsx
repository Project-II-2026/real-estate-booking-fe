import * as React from 'react'
import {useState} from 'react'
import {Link} from 'react-router'
import type {PropertyResponseDto} from "../../models/property.types.ts";
import {useAuth} from "../../hooks/useAuth.ts";

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
]

interface Props {
    property: PropertyResponseDto
}

export const PropertyCard: React.FC<Props> = ({property}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const {user} = useAuth()
    const isOwner = user?.id === property.ownerId

    const images = property.images.length > 0
        ? property.images
        : [FALLBACK_IMAGES[property.id % 3]]

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
    }

    return (
        <div className="col">
            <article className="card-lift d-flex flex-column h-100">
                <Link
                    to={`/properties/${property.id}`}
                    className="position-relative d-block overflow-hidden ratio-4x3"
                    style={{borderRadius: 8}}
                >
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${property.title} — ${index + 1}`}
                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                            style={{
                                opacity: index === activeIndex ? 1 : 0,
                                transition: "opacity 250ms ease",
                            }}
                        />
                    ))}

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="position-absolute top-50 start-0 translate-middle-y ms-2 icon-btn"
                                onClick={prevSlide}
                                aria-label="Previous image"
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: "rgba(20, 19, 15, 0.65)",
                                    backdropFilter: "blur(6px)",
                                    border: "1px solid var(--hairline-strong)",
                                }}
                            >
                                <i className="bi bi-chevron-left" style={{fontSize: 12}}/>
                            </button>
                            <button
                                type="button"
                                className="position-absolute top-50 end-0 translate-middle-y me-2 icon-btn"
                                onClick={nextSlide}
                                aria-label="Next image"
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: "rgba(20, 19, 15, 0.65)",
                                    backdropFilter: "blur(6px)",
                                    border: "1px solid var(--hairline-strong)",
                                }}
                            >
                                <i className="bi bi-chevron-right" style={{fontSize: 12}}/>
                            </button>
                        </>
                    )}
                </Link>

                <div className="pt-3 d-flex flex-column flex-grow-1">
                    <div className="eyebrow mb-2">
                        {property.type}
                    </div>

                    <Link
                        to={`/properties/${property.id}`}
                        className="d-block mb-1"
                    >
                        <h3 className="fw-medium tracking-snug mb-0 text-truncate" style={{fontSize: "1.125rem"}}>
                            {property.title}
                        </h3>
                    </Link>

                    <p className="text-bone-muted small mb-3 text-truncate" style={{fontSize: "0.875rem"}}>
                        {property.location}
                    </p>

                    <div className="mt-auto hairline-top pt-3 d-flex align-items-center justify-content-between">
                        <span className="fw-semibold" style={{fontSize: "1rem"}}>
                            €{property.price.toLocaleString()}
                        </span>
                        {isOwner ? (
                            <Link
                                to={`/edit-property/${property.id}`}
                                className="link-muted small fw-medium d-inline-flex align-items-center gap-1"
                            >
                                <i className="bi bi-pencil"/>
                                Edit
                            </Link>
                        ) : (
                            <span className="text-bone-muted" style={{fontSize: "0.8125rem"}}>
                                {property.numberOfBedrooms} · {property.numberOfBathrooms} · {property.sizeInSquareMeters}m²
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </div>
    )
}
