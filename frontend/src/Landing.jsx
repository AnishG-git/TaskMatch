import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setLoginStatus("Please fill in all fields");
      return;
    }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const result = await response.json();
    const token = result.token;
    const error = result.error;
    if (error) {
      setLoginStatus("Error logging in");
    }
    if (token) {
      setLoginStatus("Login successful");
      document.cookie = `token=${token}; path=/; httpOnly;`;
    }
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "black", fontSize: "5em" }}
      >
        TaskMatch
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={1}
        p={1}
      >
        <Button
          variant="contained"
          style={{ margin: "10px", alignSelf: "center", width: "120px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography
          variant="h6"
          align="center"
          style={{ margin: "10px", color: "black", alignSelf: "center" }}
        >
          or
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          m={1}
          p={1}
        >
          <Button variant="contained" style={{ margin: "10px" }}>
            Register as Contractor
          </Button>
          <Button variant="contained" style={{ margin: "10px" }}>
            Register as Customer
          </Button>
        </Box>
      </Box>
      <Typography
        variant="h6"
        align="center"
        style={{ margin: "10px", color: "red", alignSelf: "center" }}
      >
        {loginStatus}
      </Typography>
      </Box>
  );
}
