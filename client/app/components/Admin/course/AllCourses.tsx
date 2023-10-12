'use client';

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal, useTheme } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useTheme as NextTheme } from 'next-themes';
import { format } from 'timeago.js';

import AdminHeader from '../topbar/AdminHeader';
import Loader from '../../Loader/Loader';
import { tokens } from '../sidebar/Theme';
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from '@/redux/features/courses/coursesApi';
import DeleteModal from '../../Modal/DeleteModal';
import toast from 'react-hot-toast';
import Link from 'next/link';

const AllCourses = () => {
  const { theme: themes, setTheme } = NextTheme();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState('');

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();

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
      field: 'createdAt',
      headerName: 'Date',
      flex: 0.5,
    },
    {
      field: '',
      headerName: 'Edit',
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 size={20} />
            </Link>
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
              <AiOutlineDelete
                size={20}
                onClick={() => {
                  setOpen(!open);
                  setCourseId(params.row.id);
                }}
              />
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
          createdAt: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success('Course deleted successfully.');
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[60px] ml-12 w-full">
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
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledBy="modal-modal-title"
              aria-describedBy="modal-modal-description"
            >
              <Box>
                <DeleteModal
                  open={open}
                  setOpen={setOpen}
                  handleDelete={handleDelete}
                />
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
