'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import Loader from '../../Loader/Loader';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import AdminHeader from '../topbar/AdminHeader';

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: 'Jan 2023', count: 440 },
  //     { name: 'Feb 2023', count: 550 },
  //     { name: 'March 2023', count: 330 },
  //     { name: 'April 2023', count: 2300 },
  //     { name: 'May 2023', count: 5588 },
  //     { name: 'June 2023', count: 1440 },
  //     { name: 'July 2023', count: 4445 },
  //     { name: 'August 2023', count: 3556 },
  //     { name: 'Sept 2023', count: 732 },
  //     { name: 'October 2023', count: 4455 },
  //     { name: 'Nov 2023', count: 1044 },
  //     { name: 'December 2023', count: 4555 },
  //   ];

  const analyticsData: any = [];

  data &
    data?.users?.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen ml-12 mt-[60px]">
          <AdminHeader
            title="USER ANALYTICS"
            subtitle="Last 12 months analytics data"
          />
          <div className={`${isDashboard ? 'h-[30vh]' : 'h-screen'}`}>
            <ResponsiveContainer
              width={`${isDashboard ? '90%' : '100%'}`}
              height={`${isDashboard ? '50%' : '70%'}`}
            >
              <AreaChart
                width={500}
                height={400}
                data={analyticsData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
