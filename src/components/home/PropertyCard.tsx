import * as React from 'react'
import {useState} from 'react'
import {Link} from 'react-router'
import type {PropertyResponseDto} from "../../models/property.types.ts";
import {useAuth} from "../../hooks/useAuth.ts";

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
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
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault()
        setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
    }

    return (
        <div className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative bg-body-tertiary">
                <div className="carousel slide">
                    <div className="carousel-inner">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                            >
                                <img
                                    src={img}
                                    className="d-block w-100 object-fit-cover"
                                    height="260"
                                    alt={`${property.title} - ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                    {images.length > 1 && (
                        <>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                onClick={prevSlide}
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                onClick={nextSlide}
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"/>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </>
                    )}
                </div>

                <div className="card-body d-flex flex-column p-4">
                    <Link
                        to={`/properties/${property.id}`}
                        className="text-decoration-none text-body"
                    >
                        <h5 className="card-title fw-semibold mb-1 text-truncate">
                            {property.title}
                        </h5>
                    </Link>

                    <p className="card-text text-body-secondary small mb-4">
                        {property.location}
                    </p>

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="fs-5 fw-semibold text-body">
                            €{property.price.toLocaleString()}
                        </span>
                        {isOwner && (
                            <Link
                                to={`/edit-property/${property.id}`}
                                className="btn btn-dark btn-sm fw-medium rounded-pill px-3 shadow-sm"
                            >
                                <i className="bi bi-pencil-fill me-2"/>
                                Edit
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
