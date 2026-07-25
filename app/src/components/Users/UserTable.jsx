import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";

import { IconButton } from "@mui/material";

import { useGetUsersQuery } from "../../redux/api/userApi";

export default function UserTable({ onEdit }) {
  const { data, isLoading } = useGetUsersQuery({
    page: 1,
    page_size: 10,
  });

  const columns = [
    {
      field: "first_name",
      headerName: "نام",
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "نام خانوادگی",
      flex: 1,
    },
    {
      field: "email",
      headerName: "ایمیل",
      flex: 1.5,
    },
    {
      field: "phone_number",
      headerName: "موبایل",
      flex: 1,
    },
    {
      field: "type",
      headerName: "نوع",
      flex: 0.6,
      renderCell: ({ value }) => (value === 10 ? "ادمین" : "کاربر"),
    },
    {
      field: "action",
      headerName: "عملیات",
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton onClick={() => onEdit(row)}>
          <EditIcon color="primary" />
        </IconButton>
      ),
    },
  ];

  return (
    <DataGrid
      autoHeight
      loading={isLoading}
      rows={data?.results || []}
      columns={columns}
      getRowId={(row) => row.email}
      pageSizeOptions={[10]}
      disableRowSelectionOnClick
    />
  );
}
