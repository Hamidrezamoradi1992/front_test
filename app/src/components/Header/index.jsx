import "./Header.css";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slices/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="sticky" elevation={0} className="dashboard-header">
      <Toolbar>
        {/* لوگو */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            flex: 1,
          }}
        >
          WAZN
        </Typography>

        {/* عنوان */}
        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            opacity: 0.8,
            fontWeight: 600,
          }}
        >
          سامانه مدیریت توکن
        </Typography>

        {/* اطلاعات کاربر */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>
            {user?.first_name} {user?.last_name}
          </Typography>

          <Avatar sx={{ bgcolor: "#7C3AED" }}>
            {user?.first_name?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Button
            color="inherit"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
          >
            خروج
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
