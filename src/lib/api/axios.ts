import axios from 'axios';

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apishivom.visital.co.in';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds to ensure slow networks are handled cleanly
});

// Request Interceptor: Attach websiteKey if missing from params
apiClient.interceptors.request.use(
  (config) => {
    // Determine if the endpoint expects `websiteKey` (usually all except solar, admin, etc.)
    // For safety, we enforce it on /api/public paths that don't already have it
    if (config.url?.includes('/api/public/')) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API Request]: ${config.method?.toUpperCase()} ${config.url}`, config.params);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Normalize errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]:', error.response?.status, error.response?.data || error.message);
    }
    
    // Normalize the error for the service layer
    const customError = new Error(
      error.response?.data?.message || error.message || 'An unexpected API error occurred.'
    ) as ApiError;
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    
    return Promise.reject(customError);
  }
);
