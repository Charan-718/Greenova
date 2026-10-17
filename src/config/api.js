// API Client Configuration for GreeNova Frontend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

/**
 * Generic API fetch helper with timeout and fallback support
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = (data && data.message) || `HTTP error! status: ${response.status}`;
      return { success: false, error: errorMsg, status: response.status };
    }

    return { success: true, data: data ? (data.data !== undefined ? data.data : data) : null };
  } catch (error) {
    console.warn(`[GreeNova API] Request to ${endpoint} failed:`, error.message);
    return { success: false, error: error.message, isNetworkError: true };
  }
}

// Reports
export const submitReport = async (reportData) => {
  return await apiFetch('/reports', {
    method: 'POST',
    body: JSON.stringify(reportData)
  });
};

export const fetchReports = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return await apiFetch(`/reports${query ? `?${query}` : ''}`);
};

// Waste Items
export const fetchWasteItems = async (searchQuery = '', category = '') => {
  const params = new URLSearchParams();
  if (searchQuery) params.append('q', searchQuery);
  if (category && category !== 'All') params.append('category', category);
  const queryStr = params.toString();
  return await apiFetch(`/items${queryStr ? `?${queryStr}` : ''}`);
};

export const fetchWasteItemById = async (id) => {
  return await apiFetch(`/items/${id}`);
};

// DIY Projects
export const fetchDiyProjects = async (category = '') => {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  return await apiFetch(`/diy-projects${query}`);
};

export const createDiyProject = async (projectData) => {
  return await apiFetch('/diy-projects', {
    method: 'POST',
    body: JSON.stringify(projectData)
  });
};

// Videos
export const fetchVideos = async (category = '') => {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  return await apiFetch(`/videos${query}`);
};

export const createVideo = async (videoData) => {
  return await apiFetch('/videos', {
    method: 'POST',
    body: JSON.stringify(videoData)
  });
};

// System Health
export const checkApiHealth = async () => {
  return await apiFetch('/health');
};

const api = {
  API_BASE_URL,
  submitReport,
  fetchReports,
  fetchWasteItems,
  fetchWasteItemById,
  fetchDiyProjects,
  createDiyProject,
  fetchVideos,
  createVideo,
  checkApiHealth
};

export default api;
