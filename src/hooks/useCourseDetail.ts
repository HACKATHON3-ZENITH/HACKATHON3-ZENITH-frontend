import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useCourseDetail = (slug: string) => {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      const [courseRes, enrollmentsRes] = await Promise.all([
        api.get(`/courses/${slug}`),
        api.get('/courses/enrollments').catch(() => ({ data: { data: [] } }))
      ]);

      const course = courseRes.data.data;
      if (!course) return null;

      const enrollments = enrollmentsRes.data.data || [];
      const enrollment = enrollments.find((e: any) => e.course.id === course.id);

      return {
        ...course,
        categoryName: course.category?.name || 'Général',
        creatorName: course.creator ? `${course.creator.firstName || ''} ${course.creator.lastName || ''}`.trim() || 'Zenith Team' : 'Zenith Team',
        avgRating: course.avgRating || 0,
        reviewCount: course.reviewCount || 0,
        isEnrolled: !!enrollment,
        userCompletionRate: 0,
        modules: (course.modules || []).map((m: any) => ({
          ...m,
          lessons: (m.lessons || []).map((l: any) => ({
            ...l,
            type: l.contentType,
            contentHtml: l.textContent
          }))
        }))
      };
    },
    enabled: !!slug
  });
};
