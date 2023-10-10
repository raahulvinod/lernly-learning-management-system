import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, useTheme } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useTheme as NextTheme } from 'next-themes';
import { tokens } from '../sidebar/Theme';
import AdminHeader from '../topbar/AdminHeader';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';

const AllCourses = () => {
  const { theme: themes, setTheme } = NextTheme();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading, data, error } = useGetAllCoursesQuery({});

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'title',
      headerName: 'Course Title',
      flex: 1.2,
    },
    {
      field: 'ratings',
      headerName: 'Ratings',
      flex: 0.5,
    },
    {
      field: 'purchased',
      headerName: 'Purchased',
      flex: 0.5,
    },
    {
      field: '',
      headerName: 'Edit',
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <FiEdit2 size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: ' ',
      headerName: 'Delete',
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data?.courses?.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          createdAt: item.createdAt,
        });
      });
  }

  return (
    <div className="mt-[60px] ml-12">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <AdminHeader title="COURSES" subtitle="List of courses" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                color: `${themes === 'dark' ? '#fff !important' : ''}`,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .name-column--cell': {
                color: colors.greenAccent[300],
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: colors.blueAccent[700],
                color: `${themes === 'dark' ? '#000 !important' : ''}`,
                borderBottom: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: `${
                  themes === 'dark'
                    ? '#111C43 !important'
                    : `${colors.primary[400]} !important`
                }`,
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: colors.blueAccent[700],
              },
              '& .MuiCheckbox-root': {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
