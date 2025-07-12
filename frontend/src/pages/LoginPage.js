// src/pages/LoginPage.js
import '../App.css';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    //window.location.href = 'http://localhost:5000/auth/cas/login'; // CAS, dashboard page need redirected by endfront
    navigate('/dashboardstudent');
  }

  const handleAdminLogin = (e) => {
    navigate('/dashboardadmin');
  }

  return (
    <Box
      sx={{
        backgroundImage: 'url(/login-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'var(--vt-maroon)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="white" gutterBottom>
          Welcome to CS 4704 Capstone
        </Typography>


          <Button onClick={handleLogin} variant="contained" color="primary">
            CS Login
          </Button>
          <Button sx={{ marginLeft: 2 }} onClick={handleAdminLogin} variant="contained" color="primary">
            Admin Login
          </Button>
      </Container>
    </Box>
  );
}
