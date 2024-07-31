import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

function PlagiarismChecker() {
  const classes = useStyles();
  const history = useHistory();
  const [text, setText] = useState('');
  const [urls, setUrls] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/plagiarism/check', {
        text,
        urls: urls.split('\n').filter(url => url.trim()),
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      history.push('/results', { results: response.data });
    } catch (error) {
      console.error('Error checking plagiarism:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Plagiarism Checker
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Enter your text"
          multiline
          rows={6}
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <TextField
          label="Enter URLs to compare (one per line)"
          multiline
          rows={4}
          variant="outlined"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Check Plagiarism
        </Button>
      </form>
    </Container>
  );
}

export default PlagiarismChecker;