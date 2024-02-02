import axios, {AxiosResponse} from 'axios';

const API_BASE_URL = 'http://localhost:3001';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

interface Garden {
    "id": number,
    "title": string,
    "topic": string,
    "ownerId": number,
}


axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    async signup(name: string, email: string, password: string): Promise<LoginResponse> {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/signup`, {
                name,
                email,
                password
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    async getGardenAvarage(token: string): Promise<number> {
        try {
            const response: AxiosResponse<number> = await axios.get(`${API_BASE_URL}/garden/average`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    async getGardenList(token: string): Promise<Garden[]> {
        try {
            const response: AxiosResponse<Garden[]> = await axios.get(`${API_BASE_URL}/gardens`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    async getSimulationList(token: string, gardenId?: string): Promise<any[]> {
        try {
            const response: AxiosResponse<any[]> = await axios.get(`${API_BASE_URL}/simulations/${gardenId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    async createSimulation(token: string, gardenId: string, name: string, sensorData: any): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/simulation`, {
                gardenId,
                name,
                sensorData
            }, {
                headers: {Authorization: `Bearer ${token}`},
            });

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }

};

export default apiService;