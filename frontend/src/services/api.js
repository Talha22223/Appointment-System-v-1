import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile')
};

// Doctor service
export const doctorService = {
  getAllDoctors: () => api.get('/doctors'),
  getDoctor: (id) => api.get(`/doctors/${id}`),
  addDoctor: (doctorData) => api.post('/doctors', doctorData),
  updateDoctor: (id, doctorData) => api.put(`/doctors/${id}`, doctorData),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`)
};

// Appointment service
export const appointmentService = {
  bookAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  getPatientAppointments: () => api.get('/appointments/patient'),
  getDoctorAppointments: () => api.get('/appointments/doctor'),
  getAppointment: (id) => api.get(`/appointments/${id}`),
  updateAppointmentStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status })
};

// Prescription service
export const prescriptionService = {
  createPrescription: (prescriptionData) => api.post('/prescriptions', prescriptionData),
  getPatientPrescriptions: () => api.get('/prescriptions/patient'),
  getDoctorPrescriptions: () => api.get('/prescriptions/doctor'),
  getPrescription: (id) => api.get(`/prescriptions/${id}`)
};

export default api;
