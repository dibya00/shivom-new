import { apiClient } from '../lib/api/axios';
import { transformSlider } from '../lib/transformers';
import { ISlider, ListResponse } from '@/types';

export const slidersService = {
  getSliders: async (websiteKey: string = 'group'): Promise<ISlider[]> => {
    const response = await apiClient.get<ListResponse<ISlider>>(
      `/api/public/${websiteKey}/sliders`,
      { cache: 'no-store' }
    );
    const rawData = response.data?.data;
    if (Array.isArray(rawData)) {
      console.log(`--- [Sliders API Response for ${websiteKey}] ---`);
      rawData.forEach((item: any) => {
        console.log(`- API Slide: id=${item._id}, title="${item.title}", status="${item.status}", isActive=${item.isActive}`);
      });

      const transformed = rawData.map(transformSlider);

      const filtered = transformed.filter(
        slider => slider.status?.toLowerCase() === 'active' && slider.isActive !== false
      );

      console.log(`Total Slides From API: ${rawData.length}`);
      console.log(`Active Slides After Filter: ${filtered.length}`);
      return filtered;
    }
    return [];
  }
};
