'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import Loader from '@/app/components/Loader/Loader';
import CourseDetails from '@/app/components/course/CourseDetails';
import Heading from '@/app/utils/Heading';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from '@/redux/features/orders/ordersApi';

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(params.id);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation({});

  useEffect(() => {
    if (config) {
      const publishableKey = config?.stripePublishableKey;

      loadStripe(publishableKey).then((stripeInstance) => {
        setStripePromise(stripeInstance);
      });
    }

    if (data) {
      const amount = Math.round(data.course.price);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.clientSecret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + '-Learnly'}
            description="
      Explore a world of knowledge with our learnly eLearning platform. 
      Join educators and learners worldwide on a journey of discovery."
            keywords={data?.course?.tags}
          />
          {stripePromise && (
            <CourseDetails
              courseData={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Page;
