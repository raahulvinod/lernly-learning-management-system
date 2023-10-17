import Heading from '@/app/utils/Heading';
import CourseAnalytics from '../../../components/Admin/analytics/CourseAnalytics';

const page = () => {
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <CourseAnalytics />
    </div>
  );
};

export default page;
