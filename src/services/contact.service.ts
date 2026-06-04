import { apiClient } from '../lib/api/axios';
import { IContactPayload } from '@/types';

const WEBSITE_KEY = 'group';

export const contactService = {
  submitContact: async (payload: IContactPayload): Promise<boolean> => {
    const response = await apiClient.post(`/api/public/${WEBSITE_KEY}/contact`, payload);
    return response.data?.success || false;
  }
};
