import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

interface ProtectedProps {
  children: React.ReactNode;
}

export default function adminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  const isAdmin = user?.role === 'admin';

  return isAdmin ? children : redirect('/');
}
