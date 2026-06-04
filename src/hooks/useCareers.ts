import { useQuery, useMutation } from '@tanstack/react-query';
import { careersService } from '../services/careers.service';
import { ICareerApplicationPayload } from '@/types';

export const useCareers = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: careersService.getCareers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useCareer = (slug: string) => {
  return useQuery({
    queryKey: ['careers', slug],
    queryFn: () => careersService.getCareerBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useApplyCareer = () => {
  return useMutation({
    mutationFn: ({ slug, payload }: { slug: string, payload: ICareerApplicationPayload }) => careersService.applyForCareer(slug, payload),
  });
};
