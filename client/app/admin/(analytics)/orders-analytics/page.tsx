import Heading from '@/app/utils/Heading';
import OrdersAnalytics from '@/app/components/Admin/analytics/OrdersAnalytics';

const page = () => {
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <OrdersAnalytics />
    </div>
  );
};

export default page;
