// src/services/ApiService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {TokenHelper} from "@/helpers/tokenHelper.ts";

class ApiService {
    private static instance: ApiService;
    private client: AxiosInstance;

    private constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
            withCredentials: true,
        });

        // Optional: Add interceptors
        this.client.interceptors.request.use(
            (config) => {
                if (config.headers && TokenHelper.getAuthToken()) config.headers.Authorization = `Bearer ${TokenHelper.getAuthToken()}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                // Example auto-refresh token logic
                if (error.response?.status === 401) {
                    console.warn("Unauthorized - maybe refresh token?");
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}

export default ApiService.getInstance();