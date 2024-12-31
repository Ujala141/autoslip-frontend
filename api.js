// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// // API to add a resident
// export const addResident = async (residentData) => {
//     const response = await axios.post(`${API_URL}/residents`, residentData);
//     return response.data;
// };

// // API to add a slip
// export const addSlip = async (slipData) => {
//     const response = await axios.post(`${API_URL}/slips`, slipData);
//     return response.data;
// };

// // API to update slip status (accept/reject)
// export const updateSlipStatus = async (slipId, statusData) => {
//     const response = await axios.put(`${API_URL}/slips/${slipId}`, statusData);
//     return response.data;
// };

// // API to generate a warning
// export const generateWarning = async (warningData) => {
//     const response = await axios.post(`${API_URL}/warnings`, warningData);
//     return response.data;
// };
// import axios from 'axios';

// // Base API URL from environment variables
// const API_URL = process.env.REACT_APP_API_URL;

// // API to add a resident
// export const addResident = async (residentData) => {
//     const response = await axios.post(`${API_URL}/residents`, residentData);
//     return response.data;
// };

// // API to add a slip with optional file upload
// export const addSlip = async (slipData) => {
//     // Create a FormData object to handle file upload
//     const formData = new FormData();
//     formData.append('regNo', slipData.regNo);
//     formData.append('Name', slipData.Name);
//     formData.append('slipType', slipData.slipType);
//     formData.append('address', slipData.address);
//     formData.append('reason', slipData.reason);

//     // Check if a file is attached and append it
//     if (slipData.attachment) {
//         formData.append('attachment', slipData.attachment);
//     }

//     // Axios request for multipart/form-data
//     const response = await axios.post(`${API_URL}/submit-slip`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
// };

// // API to update slip status (accept/reject)
// export const updateSlipStatus = async (slipId, statusData) => {
//     const response = await axios.put(`${API_URL}/slips/${slipId}`, statusData);
//     return response.data;
// };

// // API to generate a warning
// export const generateWarning = async (warningData) => {
//     const response = await axios.post(`${API_URL}/warnings`, warningData);
//     return response.data;
// };

// Fetch all slips
// export const fetchSlips = async () => {
//     const response = await axios.get(`${API_URL}/slips`);
//     return response.data;
// };
// export const fetchSlips = async () => {
//     try {
//         const response = await axios.get('/api/slips');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching slips:', error);
//         throw error;
//     }
// };
// export const fetchSlips = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/slips`);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:5000" });

// export const fetchUsers = () => API.get("/api/users");
// export const addUser = (userData) => API.post("/api/users", userData);
