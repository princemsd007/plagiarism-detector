import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Results() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const results = location.state?.results || [];

  const handleBack = () => {
    history.push('/check');
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Plagiarism Results
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell align="right">Overall Similarity</TableCell>
              <TableCell align="right">TF-IDF Similarity</TableCell>
              <TableCell align="right">Word Embedding Similarity</TableCell>
              <TableCell align="right">N-gram Similarity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a>
                </TableCell>
                <TableCell align="right">{result.similarity}%</TableCell>
                <TableCell align="right">{result.tfidf_similarity}%</TableCell>
                <TableCell align="right">{result.word_embedding_similarity}%</TableCell>
                <TableCell align="right">{result.ngram_similarity}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        className={classes.button}
      >
        Back to Checker
      </Button>
    </Container>
  );
}

export default Results;