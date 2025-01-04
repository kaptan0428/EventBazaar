import axios, { AxiosInstance, AxiosResponse } from 'axios';


const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 seconds
        });

        // Add a request interceptor to include the JWT token in the Authorization header
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('jwtToken');
                console.log('Retrieved Token:', token); // Debugging: Log the token
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                    console.log('Authorization Header Set:', config.headers['Authorization']); // Debugging: Log the header
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            this.handleResponse,
            this.handleError
        );
    }
    private handleResponse(response: AxiosResponse) {
        return response;
    }

    private handleError(error: any) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.request);
            return Promise.reject({ message: 'Network Error' });
        } else {
            // Something else happened
            console.error('Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await this.axiosInstance.post<LoginResponse>('/login', credentials);
            console.log(response);

            if (response.data.jwtToken) {
                this.setAuthHeader(response.data.jwtToken);
                localStorage.setItem('jwtToken', response.data.jwtToken);
            }

            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }

    }

    async register(credentials: RegisterRequest): Promise<string> {
        try {
            const response = await this.axiosInstance.post<string>('/register', credentials);
            return response.data;
        } catch (error) {
            console.error('Registration Error:', error);
            throw error;
        }
    }

    async passwordUpdate(credentials: passwordUpdateRequest): Promise<string> {
        try {
            const response = await this.axiosInstance.put<string>('/update-password', credentials);
        } catch (error) {
            throw error;
        }
        return "Password Updated Successfully";
    }

    logout(): void {
        localStorage.removeItem('jwtToken');
        this.setAuthHeader(null);
    }


    private setAuthHeader(jwtToken: string | null): void {
        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    }
}

export default new AuthService();