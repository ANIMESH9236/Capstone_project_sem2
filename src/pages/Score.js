import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Grid,
  Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Score = () => {
  const { currentUser } = useAuth();
  const [pollResults, setPollResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const results = await api.getPollResults();
      setPollResults(results);
    } catch (err) {
      setError('Failed to fetch poll results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h4" component="h1" gutterBottom>
        Poll Results
      </Typography>

      <Grid container spacing={3}>
        {pollResults.map((poll) => (
          <Grid item xs={12} md={6} key={poll.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {poll.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Total Votes: {poll.totalVotes}
                </Typography>
                <Box mt={2}>
                  {poll.options.map((option, index) => (
                    <Box key={index} mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography variant="body2">{option.name}</Typography>
                        <Typography variant="body2">
                          {option.votes} votes ({option.percentage}%)
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 8,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${option.percentage}%`,
                            bgcolor: 'primary.main',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Score; 