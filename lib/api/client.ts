import axios, { AxiosError } from 'axios';
import { TMDB_CONFIG } from './config';
import { error } from 'console';

// Create axios instance with default config
export const tmdbClient = axios.create({
    baseURL: TMDB_CONFIG.BASE_URL,
    params: {
        api_key: TMDB_CONFIG.API_KEY,
    },
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor for logging in development
tmdbClient.interceptors.request.use(
    (config) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[TMDB_API] ${config.method?.toUpperCase()} ${config.url}`, config.params);
        }
        return config;
    },
    (error) => {
        console.error('[TMDB_API] Request error:', error);
        return Promise.reject(error);
    }
)

// Response interceptor for error handling
tmdbClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('[TMDB_API] Error', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
                url: error.config?.url,
            });

            // Custom error handling based on status code
            switch (error.response.status) {
                case 401:
                    throw new Error('Unauthorized Access - Invalid API key. Please check your TMDB configuration.')
                case 404:
                    throw new Error('The requested resource was not found.')
                case 429:
                    throw new Error('Too many requests. Please try again later.')
                default:
                    throw new Error(`TMDB API error: ${error.response.status}`)
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('[TMDB_API Error] No response received:', error.request);
            throw new Error('Network error. Please check your internet connection.')
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('[TMDB_API Error] Request setup error:', error.message);
            throw error;
        }
        return Promise.reject(error);
    }
)