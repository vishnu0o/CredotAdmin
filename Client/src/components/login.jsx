import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useDispatch, useSelector } from "react-redux";
import { LoginSubmitAction } from "../Redux/Action/AuthAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH_LOGIN_ERR } from "../Redux/Constants/AuthConstant";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reducer

  let { authLoginSuccess, authLoginErr } = useSelector((state) => {
    return state.authLogin;
  });

  // HandleSubmit

  const handleLoginSubmit = () => {
    dispatch(LoginSubmitAction(email, password));
  };

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (isUserExist) {
      navigate("/home");
    }
  }, [isUserExist, authLoginSuccess]);

  useEffect(() => {
    if (authLoginErr?.status === false) {
      toast.success(authLoginErr.message);
      dispatch({ type: AUTH_LOGIN_ERR, payload: false });
    }
  }, [authLoginErr]);
  console.log(authLoginErr, "authLoginErrauthLoginErrauthLoginErrauthLoginErr");

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            DEMO
          </Typography>
          <Box>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login to your account
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 1, mb: 2 }}
          >
            Lorem ipsum dolor sit amet consectetur. Sapien ut libero sed lacinia
            egestas placerat ut sagittis nec.
          </Typography>
          <Box component="" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email ID"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginSubmit}
            >
              LOGIN
            </Button>
          </Box>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          mt: 8,
        }}
      >
        <Typography variant="h6" gutterBottom>
          DEMO
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <IconButton color="inherit" href="#">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="#">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="#">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" href="#">
            <YouTubeIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Terms & Conditions
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Help & FAQs
          </Link>
        </Box>
        <Typography variant="body2" color="textSecondary" align="center">
          Helpline: 1800 456 84788
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Arab Deals © 2023. All Rights Reserved
        </Typography>
      </Box>
    </>
  );
}

export default Login;
