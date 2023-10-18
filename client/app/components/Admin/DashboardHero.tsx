'use client';

import { useState } from 'react';
import DashboardWidgets from './widgets/DashboardWidgets';

type Props = {
  isDashboard?: boolean;
  open: boolean;
};

export const DashboardHero: React.FC<Props> = ({ isDashboard, open }) => {
  return <div>{isDashboard && <DashboardWidgets open={open} />}</div>;
};
