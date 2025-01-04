import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8080/api/users';

class UserService {
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

    async getUserDetails(): Promise<User> {
        try {
            const response = await this.axiosInstance.get<User>('/');
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('Error fetching user details:', error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const response = await this.axiosInstance.get<User>(`/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('Error fetching user by id:', error);
            throw error;
        }
    }

    async updateUserDetails(user: Partial<User>): Promise<void> {
        try {
            const response = await this.axiosInstance.put<User>('/', user);
            console.log(response);
        } catch (error) {
            console.log('Error updating user details:', error);
            throw error;
        }
    }

    // all users
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await this.axiosInstance.get<User[]>('/all');
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('Error fetching all users:', error);
            throw error;
        }
    }

    async getTickets(): Promise<Ticket[]> {
        try {
            const response = await this.axiosInstance.get<Ticket[]>('/tickets');
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('Error fetching tickets:', error);
            throw error;
        }
    }
}

export default new UserService();