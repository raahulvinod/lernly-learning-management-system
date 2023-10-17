import Heading from '@/app/utils/Heading';
import UserAnalytics from '@/app/components/Admin/analytics/UserAnalytics';

const page = () => {
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <UserAnalytics />
    </div>
  );
};

export default page;
