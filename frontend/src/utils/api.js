// src/utils/api.js
import axios from 'axios';
const API_URL = 'http://localhost:5000/api'; // Replace with actual backend URL if deployed

export const fetchCrops = async () => {
    try {
        const response = await fetch(`${API_URL}/crops`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching crops:', error);
    }
};

export default api;