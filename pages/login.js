import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/store/session";
import { useRouter } from "next/dist/client/router";

export default function login() {
  const [email, setEmail] = useState("saklism+demo5@gmail.com");
  const [password, setPassword] = useState("12341234");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async () => {
    const url = `https://sakko-demo-api.herokuapp.com/api/v1/user/sign_in`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });

    const json = await response.json();
    dispatch(setToken(json.user.auth_jwt));
    router.replace("/auth/profile");
  };
  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>
      ,
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4>Sign In</h4>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="button"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
