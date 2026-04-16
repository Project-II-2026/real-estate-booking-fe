import {BASE_URL} from "../config.ts";
import {CONTENT_TYPE_JSON} from "../utils/constants.ts";

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers, ...otherParams } = options;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': CONTENT_TYPE_JSON,
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...otherParams,
    });

    if (!response.ok) {
        // TODO: handle errors
    }

    return response.json() as Promise<T>;
}

export const api = {
    get:    <T>(url: string, options?: RequestOptions) => request<T>(url, { method: 'GET', ...options }),
    post:   <T>(url: string, body: unknown, options?: RequestOptions) => request<T>(url, { method: 'POST', body, ...options }),
    put:    <T>(url: string, body: unknown, options?: RequestOptions) => request<T>(url, { method: 'PUT', body, ...options }),
    delete: <T>(url: string, options?: RequestOptions) => request<T>(url, { method: 'DELETE', ...options }),
};