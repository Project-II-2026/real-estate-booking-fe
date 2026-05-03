import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router'
import type {PaginationRequest} from "../models/pagination.types.ts";
import type {PropertyCreateRequestDto, PropertyUpdateRequestDto, PropertyImageUploadUrlsRequestDto, PropertySearchParams} from "../models/property.types.ts";
import {propertyService} from "../services/propertyService.ts";

const uploadToS3 = (url: string, file: File, requiredHeaders: Record<string, string>) => {
    const safeUrl = url.startsWith('https://localhost') ? url.replace('https://', 'http://') : url;
    return fetch(safeUrl, {
        method: 'PUT',
        body: file,
        headers: {'Content-Type': file.type, ...requiredHeaders},
    }).then(res => {
        if (!res.ok) throw new Error(`S3 upload failed: ${res.status}`);
    });
};

const PROPERTIES_KEY = ['properties']
const MY_PROPERTIES_KEY = ['my-properties']

export const useProperties = (params: PropertySearchParams) =>
    useQuery({
        queryKey: [...PROPERTIES_KEY, params],
        queryFn: () => propertyService.getAll(params),
    })

export const useMyProperties = (params: PaginationRequest) =>
    useQuery({
        queryKey: [...MY_PROPERTIES_KEY, params],
        queryFn: () => propertyService.getMyProperties(params),
    })

export const useProperty = (id: number) =>
    useQuery({
        queryKey: [...PROPERTIES_KEY, id],
        queryFn: () => propertyService.getById(id),
    })

export const useUpdateProperty = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}: { id: number; data: PropertyUpdateRequestDto }) =>
            propertyService.update(id, data),
        onSuccess: (_, {id}) => {
            queryClient.invalidateQueries({queryKey: [...PROPERTIES_KEY, id]})
            queryClient.invalidateQueries({queryKey: MY_PROPERTIES_KEY})
            navigate('/my-properties')
        },
    })
}

export const useCreateProperty = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: PropertyCreateRequestDto) => propertyService.create(data),
        onSuccess: () => navigate('/'),
    });
}

export const useAddPropertyWithImages = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({propertyData, files}: { propertyData: PropertyCreateRequestDto; files: File[] }) => {
            const property = await propertyService.create(propertyData);
            if (files.length === 0) return {property, presignedUrls: []};
            const request: PropertyImageUploadUrlsRequestDto = {
                images: files.map(f => ({fileName: f.name, fileSize: f.size, contentType: f.type})),
            };
            const presignedUrls = await propertyService.requestImageUploadUrls(property.id, request);
            await Promise.allSettled(
                presignedUrls.map(async ({imageId, presignedUrl, requiredHeaders}, idx) => {
                    try {
                        await uploadToS3(presignedUrl, files[idx], requiredHeaders);
                        await propertyService.confirmImageUpload(property.id, imageId);
                    } catch {
                        await propertyService.failImageUpload(property.id, imageId);
                    }
                })
            );
            return {property, presignedUrls};
        },
        onSuccess: () => navigate('/'),
    });
}
