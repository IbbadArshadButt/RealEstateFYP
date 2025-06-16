import axios from 'axios';
import {
  User,
  Property,
  Inquiry,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../types';

// Update API URL to match your backend
const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Accept': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response || error);
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('Login request with:', { email: credentials.email });
      
      // Make sure we're hitting the correct endpoint
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });

      console.log('Login response received:', response.data);

      // Validate response data
      if (!response.data || !response.data.token || !response.data.user) {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response format from server');
      }

      // Store token
      localStorage.setItem('token', response.data.token);
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      console.error('Get current user error:', error.response?.data || error.message);
      throw error;
    }
  }
};

// Property API
export const propertyAPI = {
  createProperty: async (propertyData: Partial<Property>): Promise<Property> => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  getProperties: async (params?: { agent?: string }): Promise<Property[]> => {
    try {
      console.log('Fetching properties with params:', params);
      const response = await api.get('/properties', { params });
      console.log('Properties response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  getProperty: async (id: string): Promise<Property> => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },

  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property> => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
  },

  deleteProperty: async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  }
};

// Agents API
export const agentAPI = {
  getAgents: async (): Promise<User[]> => {
    try {
      console.log('Fetching agents...');
      const response = await api.get('/users/agents');
      console.log('Agents response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  },

  getAgentProperties: async (agentId: string): Promise<Property[]> => {
    try {
      console.log(`Fetching properties for agent ${agentId}...`);
      const response = await api.get(`/properties`, { params: { agent: agentId } });
      console.log('Agent properties response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching agent ${agentId} properties:`, error);
      throw error;
    }
  }
};

// Inquiry API calls
export const inquiryAPI = {
  createInquiry: async (inquiryData: Partial<Inquiry>): Promise<Inquiry> => {
    const response = await api.post<Inquiry>('/inquiries', inquiryData);
    return response.data;
  },
  getAgentInquiries: async (): Promise<Inquiry[]> => {
    const response = await api.get<Inquiry[]>('/inquiries/agent');
    return response.data;
  },
};

// Upload multiple images
export const uploadImages = async (images: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    
    // Append each file to formData
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    // Use our configured API instance
    const response = await api.post('/upload/images', formData, {
      headers: {
        // Let the browser set the Content-Type header with boundary
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Upload response:', response.data);

    if (!response.data.images || !Array.isArray(response.data.images)) {
      throw new Error('Invalid response format from server');
    }

    // Convert local paths to full URLs
    const imageUrls = response.data.images.map((path: string) => 
      path.startsWith('http') ? path : `${API_URL}/${path.replace(/\\/g, '/')}`
    );

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

// Profile API calls
export const updateProfile = async (data: { name?: string; phone?: string; profileImage?: string }): Promise<User> => {
  try {
    const response = await api.put('/users/profile', data);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const updateProfileImage = async (formData: FormData): Promise<User> => {
  try {
    // Upload the image
    const uploadResponse = await api.put('/users/profile/image', formData, {
      headers: {
        // Remove Content-Type header to let browser set it with boundary
        'Content-Type': undefined
      }
    });
    return uploadResponse.data;
  } catch (error) {
    console.error('Error updating profile image:', error);
    throw error;
  }
};

// Review interfaces
export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewSubmission {
  name: string;
  rating: number;
  comment: string;
}

// Review API endpoints
export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};

export const submitReview = async (review: ReviewSubmission): Promise<Review> => {
  try {
    const response = await api.post('/reviews', review);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw new Error('Failed to submit review');
  }
};

export default api; 