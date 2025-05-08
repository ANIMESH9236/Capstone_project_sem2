import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Home = () => {
  const { currentUser } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    options: ['', ''],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const data = await api.getPolls();
      setPolls(data);
    } catch (err) {
      setError('Failed to fetch polls. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePoll = async () => {
    try {
      if (!newPoll.title.trim()) {
        throw new Error('Title is required');
      }
      if (!newPoll.description.trim()) {
        throw new Error('Description is required');
      }
      if (newPoll.options.some(opt => !opt.trim())) {
        throw new Error('All options must be filled');
      }

      await api.createPoll({
        ...newPoll,
        createdBy: currentUser.email,
      });
      
      setSnackbar({
        open: true,
        message: 'Poll created successfully!',
        severity: 'success',
      });
      
      setOpenDialog(false);
      setNewPoll({
        title: '',
        description: '',
        options: ['', ''],
      });
      
      fetchPolls();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to create poll',
        severity: 'error',
      });
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await api.vote(pollId, optionIndex);
      setSnackbar({
        open: true,
        message: 'Vote recorded successfully!',
        severity: 'success',
      });
      fetchPolls();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to record vote',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Active Polls
        </Typography>
        {currentUser && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Create New Poll
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {polls.map((poll) => (
          <Grid item xs={12} md={6} key={poll.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {poll.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {poll.description}
                </Typography>
                <Box mt={2}>
                  {poll.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1 }}
                      onClick={() => handleVote(poll.id, index)}
                    >
                      {option} ({poll.votes[index]} votes)
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Poll</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Poll Title"
            fullWidth
            value={newPoll.title}
            onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={newPoll.description}
            onChange={(e) => setNewPoll({ ...newPoll, description: e.target.value })}
          />
          {newPoll.options.map((option, index) => (
            <TextField
              key={index}
              margin="dense"
              label={`Option ${index + 1}`}
              fullWidth
              value={option}
              onChange={(e) => {
                const newOptions = [...newPoll.options];
                newOptions[index] = e.target.value;
                setNewPoll({ ...newPoll, options: newOptions });
              }}
            />
          ))}
          <Button
            onClick={() => setNewPoll({
              ...newPoll,
              options: [...newPoll.options, ''],
            })}
          >
            Add Option
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreatePoll} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home; 