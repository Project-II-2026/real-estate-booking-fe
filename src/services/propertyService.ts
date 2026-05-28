import type {PaginationRequest, PaginationResponse} from "../models/pagination.types.ts";
import {api} from "../api/api.ts";
import type {
    PropertyCreateRequestDto,
    PropertyUpdateRequestDto,
    PropertyImagePresignedUrlResponseDto,
    PropertyImageStatusResponseDto,
    PropertyImageUploadUrlsRequestDto,
    PropertyResponseDto,
    PropertySearchParams
} from "../models/property.types.ts";


export const propertyService = {
    getAll: (params: PropertySearchParams) =>
        api.get<PaginationResponse<PropertyResponseDto>>('/properties', params as unknown as Record<string, unknown>),
    getMyProperties: (params: PaginationRequest) =>
        api.get<PaginationResponse<PropertyResponseDto>>('/properties/me', params as unknown as Record<string, unknown>),
    getById: (id: number) =>
        api.get<PropertyResponseDto>(`/properties/${id}`),
    update: (id: number, data: PropertyUpdateRequestDto) =>
        api.put<PropertyResponseDto>(`/properties/${id}`, data),
    adminUpdate: (id: number, data: PropertyUpdateRequestDto) =>
        api.put<PropertyResponseDto>(`/admin/properties/${id}`, data),
    remove: (id: number) =>
        api.delete<void>(`/properties/${id}`),
    create: (data: PropertyCreateRequestDto) =>
        api.post<PropertyResponseDto>('/properties', data),
    requestImageUploadUrls: (propertyId: number, data: PropertyImageUploadUrlsRequestDto) =>
        api.post<PropertyImagePresignedUrlResponseDto[]>(`/properties/${propertyId}/images/upload-urls`, data),
    confirmImageUpload: (propertyId: number, imageId: number) =>
        api.patch<PropertyImageStatusResponseDto>(`/properties/${propertyId}/images/${imageId}/complete`),
    failImageUpload: (propertyId: number, imageId: number) =>
        api.patch<PropertyImageStatusResponseDto>(`/properties/${propertyId}/images/${imageId}/fail`),
}
