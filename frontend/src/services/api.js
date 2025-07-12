import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Portfolio API functions
export const portfolioAPI = {
  // Get complete portfolio data
  getPortfolio: async () => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Update hero section
  updateHero: async (heroData) => {
    try {
      const response = await api.put('/portfolio/hero', heroData);
      return response.data;
    } catch (error) {
      console.error('Error updating hero:', error);
      throw error;
    }
  },

  // Update about section
  updateAbout: async (aboutData) => {
    try {
      const response = await api.put('/portfolio/about', aboutData);
      return response.data;
    } catch (error) {
      console.error('Error updating about:', error);
      throw error;
    }
  },

  // Update skills section
  updateSkills: async (skillsData) => {
    try {
      const response = await api.put('/portfolio/skills', skillsData);
      return response.data;
    } catch (error) {
      console.error('Error updating skills:', error);
      throw error;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const response = await api.get('/portfolio/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await api.post('/portfolio/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/portfolio/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/portfolio/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Education
  getEducation: async () => {
    try {
      const response = await api.get('/portfolio/education');
      return response.data;
    } catch (error) {
      console.error('Error fetching education:', error);
      throw error;
    }
  },

  createEducation: async (educationData) => {
    try {
      const response = await api.post('/portfolio/education', educationData);
      return response.data;
    } catch (error) {
      console.error('Error creating education:', error);
      throw error;
    }
  },

  // Experience
  getExperience: async () => {
    try {
      const response = await api.get('/portfolio/experience');
      return response.data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw error;
    }
  },

  createExperience: async (experienceData) => {
    try {
      const response = await api.post('/portfolio/experience', experienceData);
      return response.data;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  },

  // Achievements
  getAchievements: async () => {
    try {
      const response = await api.get('/portfolio/achievements');
      return response.data;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw error;
    }
  },

  createAchievement: async (achievementData) => {
    try {
      const response = await api.post('/portfolio/achievements', achievementData);
      return response.data;
    } catch (error) {
      console.error('Error creating achievement:', error);
      throw error;
    }
  },

  // Update contact info
  updateContact: async (contactData) => {
    try {
      const response = await api.put('/portfolio/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },
};

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submitMessage: async (messageData) => {
    try {
      const response = await api.post('/contact/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error submitting message:', error);
      throw error;
    }
  },

  // Get all messages (admin)
  getMessages: async () => {
    try {
      const response = await api.get('/contact/messages');
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Get message by ID
  getMessage: async (messageId) => {
    try {
      const response = await api.get(`/contact/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  },

  // Update message status
  updateMessageStatus: async (messageId, status) => {
    try {
      const response = await api.put(`/contact/messages/${messageId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating message status:', error);
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      const response = await api.delete(`/contact/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  // Get contact stats
  getStats: async () => {
    try {
      const response = await api.get('/contact/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact stats:', error);
      throw error;
    }
  },
};

// General API functions
export const generalAPI = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error in health check:', error);
      throw error;
    }
  },

  // Status check (legacy)
  createStatusCheck: async (clientName) => {
    try {
      const response = await api.post('/status', { client_name: clientName });
      return response.data;
    } catch (error) {
      console.error('Error creating status check:', error);
      throw error;
    }
  },

  getStatusChecks: async () => {
    try {
      const response = await api.get('/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching status checks:', error);
      throw error;
    }
  },
};

export default api;