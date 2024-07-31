import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import PlagiarismChecker from './components/PlagiarismChecker';
import Results from './components/Results';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Switch>
          <Route path="/login">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/check">
            {isAuthenticated ? <PlagiarismChecker /> : <Redirect to="/login" />}
          </Route>
          <Route path="/results">
            {isAuthenticated ? <Results /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <Redirect to="/check" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;