import { apiSlice } from '../api/apiSlice';

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: 'get-orders',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: 'payment/stripe-publishable-key',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: 'payment',
        method: 'POST',
        body: { amount },
        credentials: 'include' as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: 'create-order',
        body: { courseId, payment_info },
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = ordersApi;
