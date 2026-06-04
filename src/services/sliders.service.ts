import { apiClient } from '../lib/api/axios';
import { transformSlider } from '../lib/transformers';
import { ISlider, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const slidersService = {
  getSliders: async (websiteKey: string = 'group'): Promise<ISlider[]> => {
    const response = await apiClient.get<ListResponse<ISlider>>(`/api/public/${websiteKey}/sliders`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformSlider);
    }
    return [];
  }
};
