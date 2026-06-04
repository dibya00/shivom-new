import { apiClient } from '../lib/api/axios';
import { transformCareer } from '../lib/transformers';
import { ICareer, ListResponse, SingleResponse, ICareerApplicationPayload } from '@/types';

const WEBSITE_KEY = 'group';

export const careersService = {
  getCareers: async (): Promise<ICareer[]> => {
    const response = await apiClient.get<ListResponse<ICareer>>(`/api/public/${WEBSITE_KEY}/careers`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformCareer);
    }
    return [];
  },

  getCareerBySlug: async (slug: string): Promise<ICareer | null> => {
    try {
      const response = await apiClient.get<SingleResponse<ICareer>>(`/api/public/${WEBSITE_KEY}/careers/${slug}`);
      if (response.data?.data) {
        return transformCareer(response.data.data);
      }
      return null;
    } catch {
      return null;
    }
  },

  applyForCareer: async (slug: string, payload: ICareerApplicationPayload): Promise<boolean> => {
    const response = await apiClient.post(`/api/public/${WEBSITE_KEY}/careers/${slug}/apply`, payload);
    return response.data?.success || false;
  }
};
