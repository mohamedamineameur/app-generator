import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../AuthContext"

const Login = () => {
    const {refreshAuth} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // reset

    try {
      await userService().loginUser({ username, password });
        refreshAuth(); // Refresh authentication state
      navigate("/admin");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (language === "fr" ? "Erreur de connexion." : "Login failed.");
      setErrorMessage(message);
    }
  };

  return (
    <Container maxWidth="sm">
    <Paper
      elevation={10}
      sx={{
        padding: 4,
        borderRadius: 4,
        mt: 8,
        backgroundColor: "#000", // fond noir
        color: "#fff"
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#ccac70" }}>
        {language === "fr" ? "Connexion" : "Login"}
      </Typography>
  
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            backgroundColor: "#5c0000",
            color: "#fff",
            border: "1px solid #ff6b6b"
          }}
        >
          {errorMessage}
        </Alert>
      )}
  
      <Box component="form" onSubmit={handleSubmit}>
      <TextField
  label={language === "fr" ? "Nom d'utilisateur" : "Username"}
  variant="outlined"
  fullWidth
  required
  margin="normal"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  InputLabelProps={{
    style: { color: "#ccac70" }
  }}
  InputProps={{
    style: { color: "#ccac70" },
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccac70"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccac70"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccac70"
      }
    }
  }}
/>

<TextField
  label={language === "fr" ? "Mot de passe" : "Password"}
  type={showPassword ? "text" : "password"}
  variant="outlined"
  fullWidth
  required
  margin="normal"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  InputLabelProps={{
    style: { color: "#ccac70" }
  }}
  InputProps={{
    style: { color: "#ccac70" },
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccac70"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccac70"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccac70"
      }
    },
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
          sx={{ color: "#ccac70" }}
          aria-label={language === "fr" ? "Afficher le mot de passe" : "Show password"}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>

  
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#ccac70",
            color: "#1D1D1D",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#c49a2f"
            }
          }}
        >
          {language === "fr" ? "Se connecter" : "Login"}
        </Button>
      </Box>
    </Paper>
  </Container>
  
  );
};

export default Login;
