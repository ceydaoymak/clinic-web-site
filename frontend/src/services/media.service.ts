import api from '../config/api';

export interface MediaUploadResponse {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    url: string;
}

export const uploadMedia = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<MediaUploadResponse>('/media/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.url; // Cloudinary returns the full URL
};
