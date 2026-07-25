import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

import UserDialog from "../../components/Users/UserDialog";
import UserTable from "../../components/Users/UserTable";

import {
  useCreateUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../redux/api/userApi";

export default function AdminUsers() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("create");

  const { data } = useGetUsersQuery({
    page: 1,
    page_size: 10,
  });

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();

  const handleEditUser = async (data) => {
    try {
      await editUser({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
      }).unwrap();

      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateUser = async (data) => {
    try {
      await createUser(data).unwrap();

      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const users = data?.results ?? [];
  return (
    <Box sx={{ p: 4 }}>
      {/* Hero */}

      <Paper
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 6,
          overflow: "hidden",
          position: "relative",
          p: 5,

          background:
            "linear-gradient(135deg,#5B21B6 0%,#7C3AED 45%,#2563EB 100%)",

          boxShadow: "0 30px 70px rgba(124,58,237,.25)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
            top: -160,
            right: -120,
            filter: "blur(20px)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(255,255,255,.05)",
            bottom: -120,
            left: -100,
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          zIndex={2}
        >
          <Box display="flex" gap={3} alignItems="center">
            <Box
              sx={{
                width: 74,
                height: 74,
                borderRadius: 4,
                display: "grid",
                placeItems: "center",

                bgcolor: "rgba(255,255,255,.15)",

                backdropFilter: "blur(16px)",
              }}
            >
              <GroupRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 42,
                }}
              />
            </Box>

            <Box>
              <Typography fontWeight={800} fontSize={34} color="#fff">
                مدیریت کاربران
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,.8)",
                  mt: 0.5,
                }}
              >
                ایجاد، مشاهده و ویرایش کاربران سامانه
              </Typography>

              <Typography
                sx={{
                  color: "#fff",
                  mt: 3,
                  fontWeight: 800,
                  fontSize: 42,
                }}
              >
                {users.length}

                <Typography
                  component="span"
                  sx={{
                    ml: 1,
                    opacity: 0.75,
                    fontSize: 18,
                  }}
                >
                  کاربر
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              setMode("create");
              setSelectedUser(null);
              setOpen(true);
            }}
            sx={{
              bgcolor: "#fff",

              color: "#5B21B6",

              px: 4,

              py: 1.6,

              borderRadius: 4,

              fontWeight: 700,

              fontSize: 16,

              textTransform: "none",

              boxShadow: "0 15px 35px rgba(0,0,0,.15)",

              "&:hover": {
                bgcolor: "#F9FAFB",
                transform: "translateY(-3px)",
              },
            }}
          >
            افزودن کاربر
          </Button>
        </Box>
      </Paper>

      {/* Search */}

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 5,
          mb: 3,
          border: "1px solid #ECECEC",
        }}
      >
        <TextField
          fullWidth
          placeholder="جستجوی نام، ایمیل یا شماره موبایل..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Table */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 5,
          p: 2,
          border: "1px solid #ECECEC",

          boxShadow: "0 10px 35px rgba(0,0,0,.04)",
        }}
      >
        <UserTable
          rows={users}
          loading={isLoading}
          onEdit={(user) => {
            setSelectedUser(user);
            setMode("edit");
            setOpen(true);
          }}
        />
      </Paper>

      <UserDialog
        open={open}
        mode={mode}
        defaultValues={selectedUser}
        onClose={() => setOpen(false)}
        onSubmit={mode === "create" ? handleCreateUser : handleEditUser}
        loading={isLoading}
      />
    </Box>
  );
}
