import { apiSlice } from '../api/apiSlice';

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: 'get-courses-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const { useGetCourseAnalyticsQuery } = analyticsApi;
