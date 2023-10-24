import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import { Course } from '../course/Courses';

import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';

interface CheckOutFormProps {
  setOpen: (open: boolean) => void;
  course: Course;
}

const CheckoutForm: React.FC<CheckOutFormProps> = ({ setOpen, course }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsLoading(false);
      createOrder({ courseId: course._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/course-access/${course._id}`);
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span
          id="button-text"
          className="text-white w-full bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2 mt-4"
        >
          {isLoading ? 'Paying...' : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-500">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
