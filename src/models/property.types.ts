export const PropertyType = {
    House: 'House',
    Apartment: 'Apartment',
} as const

export type PropertyType = typeof PropertyType[keyof typeof PropertyType]

export interface PropertySearchParams {
    page: number
    pageSize: number
    location?: string
    type?: PropertyType
    minPrice?: number
    maxPrice?: number
    minBedrooms?: number
    maxBedrooms?: number
}

export interface PropertyResponseDto {
    id: number
    title: string
    description: string
    price: number
    location: string
    images: string[]
    type: PropertyType
    numberOfBedrooms: number
    numberOfBathrooms: number
    sizeInSquareMeters: number
    ownerId: number
    ownerUsername: string
}

export interface PropertyCreateRequestDto {
    title: string
    description: string
    price: number
    location: string
    type: PropertyType
    numberOfBedrooms: number
    numberOfBathrooms: number
    sizeInSquareMeters: number
}

export interface PropertyUpdateRequestDto {
    title: string
    description: string
    price: number
    location: string
    type: PropertyType
    numberOfBedrooms: number
    numberOfBathrooms: number
    sizeInSquareMeters: number
}

export interface PropertyImageUploadItemRequestDto {
    fileName: string
    fileSize: number
    contentType: string
}

export interface PropertyImageUploadUrlsRequestDto {
    images: PropertyImageUploadItemRequestDto[]
}

export interface PropertyImagePresignedUrlResponseDto {
    imageId: number
    presignedUrl: string
    s3Key: string
    requiredHeaders: Record<string, string>
}

export interface PropertyImageStatusResponseDto {
    imageId: number
    url: string
    status: string
}
