import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../sidebar/Theme';
import { useTheme as NextThemes } from 'next-themes';

type Props = {
  title: string;
  subtitle: string;
};

const AdminHeader: React.FC<Props> = ({ title, subtitle }) => {
  const theme = useTheme();
  const { theme: themes, setTheme } = NextThemes();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color={`${themes === 'dark' ? '#fff' : colors.grey[100]}`}
        fontWeight="bold"
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AdminHeader;
