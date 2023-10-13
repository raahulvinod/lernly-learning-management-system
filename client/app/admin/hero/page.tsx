'use client';

import EditHero from '@/app/components/Admin/customization/EditHero';
import Heading from '@/app/utils/Heading';

const page = () => {
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <EditHero />
    </div>
  );
};

export default page;
