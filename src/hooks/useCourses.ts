import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useCourses = (params: any) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        api.get('/courses', { params }),
        api.get('/courses/enrollments').catch(() => ({ data: { data: [] } }))
      ]);
      
      const courses = coursesRes.data.data || [];
      const enrollments = enrollmentsRes.data.data || [];
      const enrolledCourseIds = new Set(enrollments.map((e: any) => e.course.id));
      
      // Map backend fields to frontend expected ones
      const mappedCourses = courses.map((c: any) => ({
        ...c,
        categoryName: c.category?.name || 'Général',
        creatorName: c.creator ? `${c.creator.firstName || ''} ${c.creator.lastName || ''}`.trim() || 'Zenith Team' : 'Zenith Team',
        avgRating: c.avgRating || 0,
        reviewCount: c.reviewCount || 0,
        isEnrolled: enrolledCourseIds.has(c.id),
        userCompletionRate: 0 
      }));

      // Clientside filtering
      const filtered = mappedCourses.filter((c: any) => {
        if (params.search && !c.title.toLowerCase().includes(params.search.toLowerCase())) return false;
        if (params.category && params.category !== 'all' && c.category?.slug !== params.category) return false;
        if (params.level && params.level !== 'all' && c.level !== params.level) return false;
        return true;
      });

      return filtered;
    }
  });
};
