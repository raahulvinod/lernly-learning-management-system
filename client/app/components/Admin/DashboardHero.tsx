'use client';

import { useState } from 'react';
import DashboardWidgets from './widgets/DashboardWidgets';

type Props = {
  isDashboard?: boolean;
};

export const DashboardHero: React.FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);
  return <div>{isDashboard && <DashboardWidgets open={open} />}</div>;
};
