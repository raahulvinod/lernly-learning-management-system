'use client';

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from 'recharts';

import Loader from '../../Loader/Loader';
import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import AdminHeader from '../topbar/AdminHeader';

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: 'June 2023', uv: 3 },
  //     { name: 'July 2023', uv: 2 },
  //     { name: 'August 2023', uv: 5 },
  //     { name: 'September 2023', uv: 7 },
  //     { name: 'October 2023', uv: 4 },
  //     { name: 'November 2023', uv: 10 },
  //     { name: 'December 2023', uv: 4 },
  //   ];

  const analyticsData: any = [];

  data &
    data?.courses?.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="ml-12 mt-[20px] h-screen">
          <AdminHeader
            title="COURSE ANALYTICS"
            subtitle="Last 12 months analytics data"
          />

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer
              width="80%"
              height="70%"
              style={{ zIndex: -50 }}
            >
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
