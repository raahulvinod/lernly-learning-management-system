'use client';

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal, useTheme } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme as NextTheme } from 'next-themes';
import { format } from 'timeago.js';

import AdminHeader from '../topbar/AdminHeader';
import Loader from '../../Loader/Loader';
import { tokens } from '../sidebar/Theme';
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from '@/redux/features/user/userApi';
import RoleChangeModal from '../../Modal/RoleChangeModal';
import toast from 'react-hot-toast';

type Props = {
  isTeam: boolean;
  open: boolean;
};

const AllUsers: React.FC<Props> = ({ isTeam, open }) => {
  const [active, setActive] = useState(false);
  const [userId, setuserId] = useState('');

  const { theme: themes, setTheme } = NextTheme();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  useEffect(() => {
    if (updateError) {
      if ('data' in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success('User role updated successfully');
    }
  }, [updateError, isSuccess]);

  const columns = [
    { field: 'id', headerName: 'User Id', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.8,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'purchased',
      headerName: 'Purchased',
      flex: 0.5,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 0.5,
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
    {
      field: '  ',
      headerName: 'Email',
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const admins =
      data && data.users.filter((item: any) => item.role === 'admin');
    admins &&
      admins?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          purchased: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  } else {
    data &&
      data?.users?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          purchased: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  }

  const closeModal = () => {
    setActive(false);
  };

  const addMember = async (email: string, role: string) => {
    await updateUserRole({ email, role });
  };

  return (
    <div className="mt-[20px] ml-12 w-full relative h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isTeam && (
            <div className="w-full flex justify-end absolute right-4 top-4 cursor-pointer">
              <div
                className={`bg-[#3e4396] font-Poppins text-white p-4 text-center rounded-lg !w-[190px]`}
                onClick={() => setActive(!active)}
              >
                Add new memeber
              </div>
            </div>
          )}
          <Box m="20px">
            <AdminHeader title="USER MANAGEMENT" subtitle="List of users" />
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                  color: `${themes === 'dark' ? '#fff !important' : ''}`,
                  zIndex: open ? -1 : 1,
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
                '& .name-column--cell': {
                  color: colors.greenAccent[300],
                  // zIndex: 50,
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
            {active && (
              <Modal
                open={active}
                onClose={() => setActive(!open)}
                aria-labelledBy="modal-modal-title"
                aria-describedBy="modal-modal-description"
              >
                <Box>
                  <RoleChangeModal onClose={closeModal} addMember={addMember} />
                </Box>
              </Modal>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default AllUsers;
