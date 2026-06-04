import { apiClient } from '../lib/api/axios';
const WEBSITE_KEY = 'group';

export const homeService = {
  getHomeData: async () => {
    // According to Postman, Home might just be a Page layout or custom home response
    // For now, mapping GET /api/public/group/home
    const response = await apiClient.get(`/api/public/${WEBSITE_KEY}/home`);
    // Example payload could contain sections, sliders, projects. 
    // This is dependent on exact CMS payload, applying basic transforms
    return response.data;
  }
};
