import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Plagiarism Detector
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/check">
              Check
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;